package com.booklypro.service;

import com.booklypro.domain.Business;
import com.booklypro.domain.BusinessBranding;
import com.booklypro.dto.BusinessDtos.BrandingDto;
import com.booklypro.dto.BusinessDtos.UpdateBrandingRequest;
import com.booklypro.repository.BusinessBrandingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandingService {

    private final BusinessBrandingRepository brandingRepository;
    private final BusinessService businessService;
    private final StorageService storageService;

    @Transactional
    public BusinessBranding getOrCreateBranding(String businessId) {
        return brandingRepository.findByBusinessId(businessId)
            .orElseGet(() -> {
                BusinessBranding branding = BusinessBranding.builder()
                    .id(UUID.randomUUID().toString())
                    .businessId(businessId)
                    .primaryColor("#0d9488")
                    .themeKey("emerald")
                    .welcomeMessage("Bienvenue ! Prenez rendez-vous en quelques clics.")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
                return brandingRepository.save(branding);
            });
    }

    @Transactional(readOnly = true)
    public BrandingDto getBranding(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());
        return toDto(branding);
    }

    @Transactional
    public BrandingDto updateBranding(String ownerUserId, UpdateBrandingRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());

        if (request.getPrimaryColor() != null && !request.getPrimaryColor().isBlank()) {
            branding.setPrimaryColor(request.getPrimaryColor().trim());
        }
        if (request.getThemeKey() != null && !request.getThemeKey().isBlank()) {
            branding.setThemeKey(request.getThemeKey().trim());
        }
        if (request.getWelcomeMessage() != null) {
            branding.setWelcomeMessage(request.getWelcomeMessage().trim());
        }

        brandingRepository.save(branding);
        return toDto(branding);
    }

    @Transactional
    public BrandingDto uploadLogo(String ownerUserId, MultipartFile file) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());

        String url = storageService.storeFile(file, "logos");
        branding.setLogoUrl(url);
        brandingRepository.save(branding);
        return toDto(branding);
    }

    @Transactional
    public BrandingDto uploadCover(String ownerUserId, MultipartFile file) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());

        String url = storageService.storeFile(file, "covers");
        branding.setCoverUrl(url);
        brandingRepository.save(branding);
        return toDto(branding);
    }

    @Transactional
    public BrandingDto deleteLogo(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());
        branding.setLogoUrl(null);
        brandingRepository.save(branding);
        return toDto(branding);
    }

    @Transactional
    public BrandingDto deleteCover(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        BusinessBranding branding = getOrCreateBranding(business.getId());
        branding.setCoverUrl(null);
        brandingRepository.save(branding);
        return toDto(branding);
    }

    public BrandingDto toDto(BusinessBranding b) {
        return BrandingDto.builder()
            .logoUrl(b.getLogoUrl())
            .coverUrl(b.getCoverUrl())
            .primaryColor(b.getPrimaryColor())
            .themeKey(b.getThemeKey())
            .welcomeMessage(b.getWelcomeMessage())
            .build();
    }
}
