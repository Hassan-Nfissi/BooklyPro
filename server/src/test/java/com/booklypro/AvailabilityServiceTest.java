package com.booklypro;

import com.booklypro.domain.*;
import com.booklypro.dto.BookingDtos.SlotDto;
import com.booklypro.repository.*;
import com.booklypro.service.AvailabilityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
@Transactional
public class AvailabilityServiceTest {

    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StaffServiceRepository staffServiceRepository;

    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private Business business;
    private ServiceEntity service;
    private Staff staff;

    @BeforeEach
    void setup() {
        business = businessRepository.findBySlug("salon-amina").orElseThrow();
        service = serviceRepository.findAllByBusinessId(business.getId()).get(0);
        staff = staffRepository.findAllByBusinessId(business.getId()).get(0);
    }

    @Test
    void shouldReturnSlotsForOpenWeekday() {
        // Next Monday
        LocalDate nextMonday = LocalDate.now().plusWeeks(1);
        while (nextMonday.getDayOfWeek().getValue() != 1) {
            nextMonday = nextMonday.plusDays(1);
        }

        List<SlotDto> slots = availabilityService.getAvailableSlots("salon-amina", service.getId(), staff.getId(), nextMonday);
        assertNotNull(slots);
        assertFalse(slots.isEmpty(), "Slots should be available on Monday for Salon Amina");
        assertEquals("09:00", slots.get(0).getFormattedTime());
    }

    @Test
    void shouldReturnEmptySlotsForClosedSunday() {
        // Next Sunday
        LocalDate nextSunday = LocalDate.now().plusWeeks(1);
        while (nextSunday.getDayOfWeek().getValue() != 7) {
            nextSunday = nextSunday.plusDays(1);
        }

        List<SlotDto> slots = availabilityService.getAvailableSlots("salon-amina", service.getId(), staff.getId(), nextSunday);
        assertNotNull(slots);
        assertTrue(slots.isEmpty(), "Sunday is marked closed in seed data, should return 0 slots");
    }

    @Test
    void shouldExcludeSlotWhenAppointmentExists() {
        LocalDate date = LocalDate.now().plusDays(2);
        while (date.getDayOfWeek().getValue() == 7) {
            date = date.plusDays(1);
        }

        LocalDateTime slotStart = LocalDateTime.of(date, LocalTime.of(10, 0));
        LocalDateTime slotEnd = slotStart.plusMinutes(service.getDurationMinutes());

        // Create an appointment at 10:00
        Appointment app = Appointment.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .customerId("cust-001")
            .serviceId(service.getId())
            .staffId(staff.getId())
            .serviceNameSnapshot(service.getName())
            .durationMinutesSnapshot(service.getDurationMinutes())
            .priceMadSnapshot(service.getPriceMad())
            .startsAt(slotStart)
            .endsAt(slotEnd)
            .status("CONFIRMED")
            .bookingReference("BK-TEST-" + UUID.randomUUID().toString().substring(0, 4))
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        appointmentRepository.save(app);

        List<SlotDto> slots = availabilityService.getAvailableSlots("salon-amina", service.getId(), staff.getId(), date);
        boolean contains10am = slots.stream().anyMatch(s -> s.getFormattedTime().equals("10:00"));
        assertFalse(contains10am, "Slot at 10:00 must be excluded because an active appointment exists");
    }
}
