package com.booklypro.service;

import com.booklypro.domain.*;
import com.booklypro.dto.BookingDtos.SlotDto;
import com.booklypro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final BusinessRepository businessRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final StaffServiceRepository staffServiceRepository;
    private final WorkingHoursRepository workingHoursRepository;
    private final TimeOffRepository timeOffRepository;
    private final AppointmentRepository appointmentRepository;

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");

    @Transactional(readOnly = true)
    public List<SlotDto> getAvailableSlots(String businessSlug, String serviceId, String staffId, LocalDate date) {
        Business business = businessRepository.findBySlug(businessSlug)
            .orElseThrow(() -> new IllegalArgumentException("Entreprise introuvable"));

        if (!business.isPublished()) {
            throw new IllegalArgumentException("La page de cet établissement n'est pas encore publiée");
        }

        ServiceEntity service = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new IllegalArgumentException("Service introuvable"));

        if (!service.isActive() || !service.getBusinessId().equals(business.getId())) {
            throw new IllegalArgumentException("Service non disponible");
        }

        LocalDate today = LocalDate.now();
        if (date.isBefore(today)) {
            return Collections.emptyList();
        }

        if (date.isAfter(today.plusDays(business.getBookingHorizonDays()))) {
            return Collections.emptyList();
        }

        int weekday = date.getDayOfWeek().getValue(); // 1 = Monday ... 7 = Sunday
        List<WorkingHours> whList = workingHoursRepository.findAllByBusinessIdAndWeekday(business.getId(), weekday);
        if (whList.isEmpty() || whList.get(0).isClosed()) {
            return Collections.emptyList();
        }
        WorkingHours wh = whList.get(0);

        // Find candidate staff members
        List<Staff> candidateStaff = new ArrayList<>();
        if (staffId != null && !staffId.isBlank() && !"any".equalsIgnoreCase(staffId)) {
            Staff s = staffRepository.findById(staffId).orElse(null);
            if (s != null && s.isActive() && s.getBusinessId().equals(business.getId())) {
                boolean assigned = staffServiceRepository.existsByStaffIdAndServiceId(s.getId(), service.getId());
                if (assigned) {
                    candidateStaff.add(s);
                }
            }
        } else {
            // Find all active staff assigned to this service
            List<Staff> allStaff = staffRepository.findAllByBusinessIdAndActiveTrue(business.getId());
            for (Staff s : allStaff) {
                if (staffServiceRepository.existsByStaffIdAndServiceId(s.getId(), service.getId())) {
                    candidateStaff.add(s);
                }
            }
        }

        if (candidateStaff.isEmpty()) {
            return Collections.emptyList();
        }

        LocalDateTime earliestAllowed = LocalDateTime.now().plusHours(business.getAdvanceNoticeHours());

        // Step through working hours in 30-minute intervals
        int totalSlotMinutes = service.getDurationMinutes() + service.getBufferMinutes();
        LocalTime current = wh.getStartTime();
        LocalTime closeTime = wh.getEndTime();

        List<SlotDto> availableSlots = new ArrayList<>();
        Set<String> addedTimes = new HashSet<>();

        while (!current.plusMinutes(service.getDurationMinutes()).isAfter(closeTime)) {
            LocalDateTime slotStart = LocalDateTime.of(date, current);
            LocalDateTime serviceEnd = slotStart.plusMinutes(service.getDurationMinutes());
            LocalDateTime totalBlockEnd = slotStart.plusMinutes(totalSlotMinutes);

            if (!slotStart.isBefore(earliestAllowed)) {
                // Check if any candidate staff is free
                for (Staff staff : candidateStaff) {
                    if (isStaffAvailable(business.getId(), staff.getId(), slotStart, totalBlockEnd)) {
                        String timeKey = current.format(TIME_FORMAT);
                        // If "any" staff requested, we present the slot once with the assigned staff
                        if (!addedTimes.contains(timeKey) || (staffId != null && !"any".equalsIgnoreCase(staffId))) {
                            availableSlots.add(SlotDto.builder()
                                .startTime(slotStart)
                                .endTime(serviceEnd)
                                .staffId(staff.getId())
                                .staffName(staff.getDisplayName())
                                .formattedTime(timeKey)
                                .build());
                            addedTimes.add(timeKey);
                            if (staffId == null || "any".equalsIgnoreCase(staffId)) {
                                break; // Only need one staff to offer the slot
                            }
                        }
                    }
                }
            }

            current = current.plusMinutes(30);
        }

        availableSlots.sort(Comparator.comparing(SlotDto::getStartTime));
        return availableSlots;
    }

    public boolean isStaffAvailable(String businessId, String staffId, LocalDateTime slotStart, LocalDateTime slotEnd) {
        // 1. Check time off
        List<TimeOff> timeOffs = timeOffRepository.findAllByBusinessIdAndStartsAtLessThanEqualAndEndsAtGreaterThanEqual(
            businessId, slotEnd, slotStart
        );
        for (TimeOff to : timeOffs) {
            if (to.getStaffId() == null || to.getStaffId().equals(staffId)) {
                return false;
            }
        }

        // 2. Check existing non-cancelled appointments
        List<Appointment> conflicts = appointmentRepository.findOverlappingAppointments(staffId, slotStart, slotEnd);
        return conflicts.isEmpty();
    }
}
