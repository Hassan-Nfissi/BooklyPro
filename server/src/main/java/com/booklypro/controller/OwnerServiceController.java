package com.booklypro.controller;

import com.booklypro.dto.ServiceStaffDtos.CreateServiceRequest;
import com.booklypro.dto.ServiceStaffDtos.ServiceDto;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.ServiceManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner/services")
@RequiredArgsConstructor
public class OwnerServiceController {

    private final ServiceManagementService serviceManagementService;

    @GetMapping
    public ResponseEntity<List<ServiceDto>> listServices() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(serviceManagementService.listServices(userId));
    }

    @PostMapping
    public ResponseEntity<ServiceDto> createService(@Valid @RequestBody CreateServiceRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(serviceManagementService.createService(userId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceDto> updateService(@PathVariable String id, @Valid @RequestBody CreateServiceRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(serviceManagementService.updateService(userId, id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ServiceDto> toggleStatus(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(serviceManagementService.toggleServiceActive(userId, id));
    }
}
