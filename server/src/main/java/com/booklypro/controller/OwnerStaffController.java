package com.booklypro.controller;

import com.booklypro.dto.ServiceStaffDtos.CreateStaffRequest;
import com.booklypro.dto.ServiceStaffDtos.StaffDto;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.StaffManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner/staff")
@RequiredArgsConstructor
public class OwnerStaffController {

    private final StaffManagementService staffManagementService;

    @GetMapping
    public ResponseEntity<List<StaffDto>> listStaff() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(staffManagementService.listStaff(userId));
    }

    @PostMapping
    public ResponseEntity<StaffDto> createStaff(@Valid @RequestBody CreateStaffRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(staffManagementService.createStaff(userId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffDto> updateStaff(@PathVariable String id, @Valid @RequestBody CreateStaffRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(staffManagementService.updateStaff(userId, id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<StaffDto> toggleStatus(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(staffManagementService.toggleStaffActive(userId, id));
    }
}
