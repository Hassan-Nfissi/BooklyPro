package com.booklypro.service;

import com.booklypro.domain.Appointment;
import com.booklypro.domain.Business;
import com.booklypro.domain.Customer;
import com.booklypro.domain.Staff;
import com.booklypro.dto.BookingDtos.AppointmentDto;
import com.booklypro.dto.BookingDtos.CancelAppointmentRequest;
import com.booklypro.repository.AppointmentRepository;
import com.booklypro.repository.CustomerRepository;
import com.booklypro.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;
    private final BusinessService businessService;
    private final BookingService bookingService;

    @Transactional(readOnly = true)
    public List<AppointmentDto> listAppointments(String ownerUserId, String status, LocalDateTime from, LocalDateTime to) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);

        List<Appointment> list;
        if (from != null && to != null) {
            list = appointmentRepository.findAllByBusinessIdAndStartsAtBetweenOrderByStartsAtAsc(business.getId(), from, to);
        } else {
            list = appointmentRepository.findAllByBusinessIdOrderByStartsAtDesc(business.getId());
        }

        if (status != null && !status.isBlank() && !"all".equalsIgnoreCase(status)) {
            list = list.stream().filter(a -> a.getStatus().equalsIgnoreCase(status)).toList();
        }

        return list.stream().map(a -> {
            Customer c = customerRepository.findById(a.getCustomerId()).orElse(null);
            Staff s = staffRepository.findById(a.getStaffId()).orElse(null);
            return bookingService.toDto(a, c, s);
        }).toList();
    }

    @Transactional
    public AppointmentDto updateStatus(String ownerUserId, String appointmentId, String newStatus) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        Appointment app = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new IllegalArgumentException("Rendez-vous introuvable"));

        if (!app.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce rendez-vous n'appartient pas à votre établissement");
        }

        app.setStatus(newStatus.toUpperCase());
        appointmentRepository.save(app);

        Customer c = customerRepository.findById(app.getCustomerId()).orElse(null);
        Staff s = staffRepository.findById(app.getStaffId()).orElse(null);
        return bookingService.toDto(app, c, s);
    }

    @Transactional
    public AppointmentDto cancelAppointment(String ownerUserId, String appointmentId, CancelAppointmentRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        Appointment app = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new IllegalArgumentException("Rendez-vous introuvable"));

        if (!app.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce rendez-vous n'appartient pas à votre établissement");
        }

        app.setStatus("CANCELLED");
        if (request != null && request.getCancellationReason() != null) {
            app.setCancellationReason(request.getCancellationReason());
        }
        appointmentRepository.save(app);

        Customer c = customerRepository.findById(app.getCustomerId()).orElse(null);
        Staff s = staffRepository.findById(app.getStaffId()).orElse(null);
        return bookingService.toDto(app, c, s);
    }

    @Transactional(readOnly = true)
    public List<Customer> listCustomers(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        return customerRepository.findAllByBusinessIdOrderByCreatedAtDesc(business.getId());
    }
}
