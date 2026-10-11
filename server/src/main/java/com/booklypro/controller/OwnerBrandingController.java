package com.booklypro.controller;

import com.booklypro.dto.BusinessDtos.*;
import com.booklypro.security.SecurityUtils;
import com.booklypro.service.BrandingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/owner/business/branding")
@RequiredArgsConstructor
public class OwnerBrandingController {

    private final BrandingService brandingService;

    @GetMapping
    public ResponseEntity<BrandingDto> getBranding() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.getBranding(userId));
    }

    @PutMapping
    public ResponseEntity<BrandingDto> updateBranding(@RequestBody UpdateBrandingRequest request) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.updateBranding(userId, request));
    }

    @PostMapping(value = "/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BrandingDto> uploadLogo(@RequestParam("file") MultipartFile file) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.uploadLogo(userId, file));
    }

    @PostMapping(value = "/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BrandingDto> uploadCover(@RequestParam("file") MultipartFile file) {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.uploadCover(userId, file));
    }

    @DeleteMapping("/logo")
    public ResponseEntity<BrandingDto> deleteLogo() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.deleteLogo(userId));
    }

    @DeleteMapping("/cover")
    public ResponseEntity<BrandingDto> deleteCover() {
        String userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(brandingService.deleteCover(userId));
    }
}
