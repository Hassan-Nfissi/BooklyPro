package com.booklypro;

import com.booklypro.domain.*;
import com.booklypro.dto.BookingDtos.CreateAppointmentRequest;
import com.booklypro.repository.*;
import com.booklypro.service.BookingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
public class BookingConcurrencyTest {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Test
    void shouldRejectSecondBookingOnSameSlotWithConflict() {
        Business business = businessRepository.findBySlug("salon-amina").orElseThrow();
        ServiceEntity service = serviceRepository.findAllByBusinessId(business.getId()).get(0);
        Staff staff = staffRepository.findAllByBusinessId(business.getId()).get(0);

        LocalDate date = LocalDate.now().plusDays(4);
        while (date.getDayOfWeek().getValue() == 7) {
            date = date.plusDays(1);
        }
        LocalDateTime slotTime = LocalDateTime.of(date, LocalTime.of(14, 0));

        CreateAppointmentRequest req1 = new CreateAppointmentRequest(
            service.getId(), staff.getId(), slotTime,
            "Client Premier", "client1@test.ma", "+212 600-111222", "Premier rendez-vous"
        );

        CreateAppointmentRequest req2 = new CreateAppointmentRequest(
            service.getId(), staff.getId(), slotTime,
            "Client Deuxieme", "client2@test.ma", "+212 600-333444", "Meme créneau"
        );

        // First booking succeeds
        var app1 = bookingService.bookAppointment("salon-amina", req1);
        assertNotNull(app1);
        assertNotNull(app1.getBookingReference());

        // Second booking on exact same slot must throw IllegalStateException (which maps to 409 Conflict)
        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            bookingService.bookAppointment("salon-amina", req2);
        });

        assertTrue(ex.getMessage().contains("n'est plus disponible") || ex.getMessage().contains("Ce créneau vient d'être réservé"));
    }
}
