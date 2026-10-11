package com.booklypro.service;

import com.booklypro.domain.*;
import com.booklypro.dto.BookingDtos.*;
import com.booklypro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BusinessRepository businessRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final StaffServiceRepository staffServiceRepository;
    private final CustomerRepository customerRepository;
    private final AppointmentRepository appointmentRepository;
    private final AvailabilityService availabilityService;
    private final NotificationService notificationService;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy à HH:mm");

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AppointmentDto bookAppointment(String businessSlug, CreateAppointmentRequest request) {
        Business business = businessRepository.findBySlug(businessSlug)
            .orElseThrow(() -> new IllegalArgumentException("Entreprise introuvable"));

        if (!business.isPublished()) {
            throw new IllegalArgumentException("La page de cet établissement n'est pas encore publiée");
        }

        ServiceEntity service = serviceRepository.findById(request.getServiceId())
            .orElseThrow(() -> new IllegalArgumentException("Service introuvable"));

        if (!service.isActive() || !service.getBusinessId().equals(business.getId())) {
            throw new IllegalArgumentException("Service sélectionné non disponible");
        }

        LocalDateTime startsAt = request.getStartsAt();
        LocalDateTime endsAt = startsAt.plusMinutes(service.getDurationMinutes());
        LocalDateTime totalBlockEnd = startsAt.plusMinutes(service.getDurationMinutes() + service.getBufferMinutes());

        if (startsAt.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Impossible de réserver un créneau dans le passé");
        }

        // Determine staff
        Staff staff = null;
        if (request.getStaffId() != null && !request.getStaffId().isBlank() && !"any".equalsIgnoreCase(request.getStaffId())) {
            staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new IllegalArgumentException("Membre du personnel introuvable"));

            if (!staff.isActive() || !staff.getBusinessId().equals(business.getId())) {
                throw new IllegalArgumentException("Membre du personnel indisponible");
            }

            if (!staffServiceRepository.existsByStaffIdAndServiceId(staff.getId(), service.getId())) {
                throw new IllegalArgumentException("Ce membre du personnel n'effectue pas ce service");
            }
        } else {
            // Find first available staff assigned to this service
            List<Staff> staffList = staffRepository.findAllByBusinessIdAndActiveTrue(business.getId());
            for (Staff candidate : staffList) {
                if (staffServiceRepository.existsByStaffIdAndServiceId(candidate.getId(), service.getId())) {
                    if (availabilityService.isStaffAvailable(business.getId(), candidate.getId(), startsAt, totalBlockEnd)) {
                        staff = candidate;
                        break;
                    }
                }
            }

            if (staff == null) {
                throw new IllegalStateException("Aucun collaborateur disponible pour ce créneau horaire");
            }
        }

        // Strict transactional concurrency check (returns 409 Conflict if taken)
        boolean available = availabilityService.isStaffAvailable(business.getId(), staff.getId(), startsAt, totalBlockEnd);
        if (!available) {
            throw new IllegalStateException("Ce créneau vient d'être réservé par un autre client. Veuillez choisir un autre horaire.");
        }

        // Find or create customer
        Customer customer = null;
        if (request.getCustomerEmail() != null && !request.getCustomerEmail().isBlank()) {
            customer = customerRepository.findByBusinessIdAndEmail(business.getId(), request.getCustomerEmail().trim()).orElse(null);
        }
        if (customer == null && request.getCustomerPhone() != null && !request.getCustomerPhone().isBlank()) {
            customer = customerRepository.findByBusinessIdAndPhone(business.getId(), request.getCustomerPhone().trim()).orElse(null);
        }
        if (customer == null) {
            customer = Customer.builder()
                .id(UUID.randomUUID().toString())
                .businessId(business.getId())
                .fullName(request.getCustomerName().trim())
                .email(request.getCustomerEmail() != null ? request.getCustomerEmail().trim() : null)
                .phone(request.getCustomerPhone().trim())
                .createdAt(LocalDateTime.now())
                .build();
            customerRepository.save(customer);
        }

        String reference = "BK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Appointment appointment = Appointment.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .customerId(customer.getId())
            .serviceId(service.getId())
            .staffId(staff.getId())
            .serviceNameSnapshot(service.getName())
            .durationMinutesSnapshot(service.getDurationMinutes())
            .priceMadSnapshot(service.getPriceMad())
            .startsAt(startsAt)
            .endsAt(endsAt)
            .status("CONFIRMED")
            .bookingReference(reference)
            .customerNote(request.getCustomerNote())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        appointmentRepository.save(appointment);

        // Notify
        notificationService.sendBookingConfirmation(
            business.getId(),
            appointment.getId(),
            customer.getEmail(),
            customer.getFullName(),
            service.getName(),
            startsAt.format(DATE_TIME_FORMATTER),
            reference
        );

        return toDto(appointment, customer, staff);
    }

    @Transactional(readOnly = true)
    public AppointmentDto getAppointmentByReference(String reference) {
        Appointment app = appointmentRepository.findByBookingReference(reference)
            .orElseThrow(() -> new IllegalArgumentException("Réservation introuvable pour la référence : " + reference));

        Customer customer = customerRepository.findById(app.getCustomerId()).orElse(null);
        Staff staff = staffRepository.findById(app.getStaffId()).orElse(null);

        return toDto(app, customer, staff);
    }

    public AppointmentDto toDto(Appointment app, Customer customer, Staff staff) {
        return AppointmentDto.builder()
            .id(app.getId())
            .businessId(app.getBusinessId())
            .serviceId(app.getServiceId())
            .serviceName(app.getServiceNameSnapshot())
            .priceMad(app.getPriceMadSnapshot())
            .durationMinutes(app.getDurationMinutesSnapshot())
            .startsAt(app.getStartsAt())
            .endsAt(app.getEndsAt())
            .status(app.getStatus())
            .bookingReference(app.getBookingReference())
            .customerName(customer != null ? customer.getFullName() : "Client")
            .customerEmail(customer != null ? customer.getEmail() : null)
            .customerPhone(customer != null ? customer.getPhone() : null)
            .customerNote(app.getCustomerNote())
            .staffId(app.getStaffId())
            .staffName(staff != null ? staff.getDisplayName() : "Équipe")
            .createdAt(app.getCreatedAt())
            .build();
    }
}
