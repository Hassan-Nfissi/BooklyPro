package com.booklypro.controller;

import com.booklypro.dto.ServiceStaffDtos.*;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
public class OwnerScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/working-hours")
    public ResponseEntity<List<WorkingHoursDto>> getWorkingHours() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(scheduleService.getWorkingHours(userId));
    }

    @PutMapping("/working-hours")
    public ResponseEntity<List<WorkingHoursDto>> updateWorkingHours(@RequestBody UpdateWorkingHoursRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(scheduleService.updateWorkingHours(userId, request));
    }

    @GetMapping("/time-off")
    public ResponseEntity<List<TimeOffDto>> listTimeOff() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(scheduleService.listTimeOff(userId));
    }

    @PostMapping("/time-off")
    public ResponseEntity<TimeOffDto> createTimeOff(@Valid @RequestBody CreateTimeOffRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(scheduleService.createTimeOff(userId, request));
    }

    @DeleteMapping("/time-off/{id}")
    public ResponseEntity<Void> deleteTimeOff(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        scheduleService.deleteTimeOff(userId, id);
        return ResponseEntity.noContent().build();
    }
}
