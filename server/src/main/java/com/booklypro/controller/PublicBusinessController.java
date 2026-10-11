package com.booklypro.controller;

import com.booklypro.domain.Business;
import com.booklypro.domain.BusinessBranding;
import com.booklypro.dto.BookingDtos.PublicBusinessDto;
import com.booklypro.dto.BusinessDtos.BrandingDto;
import com.booklypro.dto.ServiceStaffDtos.ServiceDto;
import com.booklypro.dto.ServiceStaffDtos.StaffDto;
import com.booklypro.dto.ServiceStaffDtos.WorkingHoursDto;
import com.booklypro.repository.*;
import com.booklypro.service.BrandingService;
import com.booklypro.service.ScheduleService;
import com.booklypro.service.ServiceManagementService;
import com.booklypro.service.StaffManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/v1/public/businesses")
@RequiredArgsConstructor
public class PublicBusinessController {

    private final BusinessRepository businessRepository;
    private final BusinessBrandingRepository brandingRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final WorkingHoursRepository workingHoursRepository;
    private final BrandingService brandingService;
    private final ServiceManagementService serviceManagementService;
    private final StaffManagementService staffManagementService;
    private final ScheduleService scheduleService;

    @GetMapping("/{slug}")
    public ResponseEntity<PublicBusinessDto> getPublicBusiness(@PathVariable String slug) {
        Business business = businessRepository.findBySlug(slug)
            .orElseThrow(() -> new IllegalArgumentException("Établissement introuvable"));

        if (!business.isPublished()) {
            throw new IllegalArgumentException("La page de réservation de cet établissement n'est pas encore publiée");
        }

        BusinessBranding branding = brandingRepository.findByBusinessId(business.getId())
            .orElseGet(() -> BusinessBranding.builder()
                .primaryColor("#0d9488")
                .themeKey("emerald")
                .welcomeMessage("Bienvenue !")
                .build());

        List<ServiceDto> services = serviceRepository.findAllByBusinessIdAndActiveTrue(business.getId()).stream()
            .map(serviceManagementService::toDto)
            .toList();

        List<StaffDto> staff = staffRepository.findAllByBusinessIdAndActiveTrue(business.getId()).stream()
            .map(staffManagementService::toDto)
            .toList();

        List<WorkingHoursDto> hours = workingHoursRepository.findAllByBusinessId(business.getId()).stream()
            .sorted(Comparator.comparingInt(com.booklypro.domain.WorkingHours::getWeekday))
            .map(scheduleService::toDto)
            .toList();

        PublicBusinessDto dto = PublicBusinessDto.builder()
            .id(business.getId())
            .name(business.getName())
            .slug(business.getSlug())
            .category(business.getCategory())
            .description(business.getDescription())
            .phone(business.getPhone())
            .city(business.getCity())
            .address(business.getAddress())
            .currency(business.getCurrency())
            .branding(brandingService.toDto(branding))
            .services(services)
            .staff(staff)
            .workingHours(hours)
            .advanceNoticeHours(business.getAdvanceNoticeHours())
            .bookingHorizonDays(business.getBookingHorizonDays())
            .build();

        return ResponseEntity.ok(dto);
    }
}
