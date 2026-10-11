package com.booklypro.controller;

import com.booklypro.domain.Customer;
import com.booklypro.dto.BookingDtos.AppointmentDto;
import com.booklypro.dto.BookingDtos.CancelAppointmentRequest;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
public class OwnerAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentDto>> listAppointments(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(appointmentService.listAppointments(userId, status, from, to));
    }

    @PatchMapping("/appointments/{id}/status")
    public ResponseEntity<AppointmentDto> updateStatus(
        @PathVariable String id,
        @RequestParam String status
    ) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(appointmentService.updateStatus(userId, id, status));
    }

    @PostMapping("/appointments/{id}/cancel")
    public ResponseEntity<AppointmentDto> cancel(
        @PathVariable String id,
        @RequestBody(required = false) CancelAppointmentRequest request
    ) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(appointmentService.cancelAppointment(userId, id, request));
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> listCustomers() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(appointmentService.listCustomers(userId));
    }
}
