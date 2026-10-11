package com.booklypro.controller;

import com.booklypro.dto.BookingDtos.*;
import com.booklypro.service.AvailabilityService;
import com.booklypro.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PublicBookingController {

    private final AvailabilityService availabilityService;
    private final BookingService bookingService;

    @GetMapping("/public/businesses/{slug}/availability")
    public ResponseEntity<List<SlotDto>> getAvailability(
        @PathVariable String slug,
        @RequestParam String serviceId,
        @RequestParam(required = false) String staffId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(availabilityService.getAvailableSlots(slug, serviceId, staffId, date));
    }

    @PostMapping("/public/businesses/{slug}/appointments")
    public ResponseEntity<AppointmentDto> book(
        @PathVariable String slug,
        @Valid @RequestBody CreateAppointmentRequest request
    ) {
        return ResponseEntity.ok(bookingService.bookAppointment(slug, request));
    }

    @GetMapping("/public/appointments/{reference}")
    public ResponseEntity<AppointmentDto> getAppointment(@PathVariable String reference) {
        return ResponseEntity.ok(bookingService.getAppointmentByReference(reference));
    }
}
