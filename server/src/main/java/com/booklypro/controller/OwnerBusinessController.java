package com.booklypro.controller;

import com.booklypro.dto.BusinessDtos.*;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.BusinessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
public class OwnerBusinessController {

    private final BusinessService businessService;

    @GetMapping("/business")
    public ResponseEntity<BusinessDto> getBusiness() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(businessService.getBusinessForOwner(userId));
    }

    @PutMapping("/business")
    public ResponseEntity<BusinessDto> updateBusiness(@Valid @RequestBody UpdateBusinessRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(businessService.updateBusiness(userId, request));
    }

    @PostMapping("/business/publish")
    public ResponseEntity<BusinessDto> publish() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(businessService.publish(userId));
    }

    @PostMapping("/business/unpublish")
    public ResponseEntity<BusinessDto> unpublish() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(businessService.unpublish(userId));
    }

    @GetMapping("/dashboard/summary")
    public ResponseEntity<DashboardSummaryDto> getSummary() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(businessService.getDashboardSummary(userId));
    }
}
