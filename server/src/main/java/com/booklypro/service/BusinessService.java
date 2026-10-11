package com.booklypro.service;

import com.booklypro.domain.Business;
import com.booklypro.domain.BusinessBranding;
import com.booklypro.dto.BusinessDtos.*;
import com.booklypro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public Business getBusinessEntityForOwner(String ownerUserId) {
        return businessRepository.findByOwnerUserId(ownerUserId)
            .orElseThrow(() -> new IllegalArgumentException("Aucune entreprise associée à cet utilisateur"));
    }

    @Transactional(readOnly = true)
    public BusinessDto getBusinessForOwner(String ownerUserId) {
        Business business = getBusinessEntityForOwner(ownerUserId);
        return toDto(business);
    }

    @Transactional
    public BusinessDto updateBusiness(String ownerUserId, UpdateBusinessRequest request) {
        Business business = getBusinessEntityForOwner(ownerUserId);

        String normalizedSlug = request.getSlug().toLowerCase().trim().replaceAll("[^a-z0-9-]+", "-");
        if (normalizedSlug.isBlank()) {
            throw new IllegalArgumentException("Le slug doit contenir des caractères alphanumériques valides");
        }

        if (businessRepository.existsBySlugAndIdNot(normalizedSlug, business.getId())) {
            throw new IllegalArgumentException("Ce lien personnalisé (slug) est déjà utilisé par un autre établissement");
        }

        business.setName(request.getName().trim());
        business.setSlug(normalizedSlug);
        business.setCategory(request.getCategory());
        business.setDescription(request.getDescription());
        business.setPhone(request.getPhone());
        business.setCity(request.getCity().trim());
        business.setAddress(request.getAddress());
        if (request.getAdvanceNoticeHours() > 0) {
            business.setAdvanceNoticeHours(request.getAdvanceNoticeHours());
        }
        if (request.getBookingHorizonDays() > 0) {
            business.setBookingHorizonDays(request.getBookingHorizonDays());
        }

        businessRepository.save(business);
        return toDto(business);
    }

    @Transactional
    public BusinessDto publish(String ownerUserId) {
        Business business = getBusinessEntityForOwner(ownerUserId);

        long activeServices = serviceRepository.findAllByBusinessIdAndActiveTrue(business.getId()).size();
        if (activeServices == 0) {
            throw new IllegalArgumentException("Vous devez créer au moins un service actif avant de publier votre page");
        }

        long activeStaff = staffRepository.findAllByBusinessIdAndActiveTrue(business.getId()).size();
        if (activeStaff == 0) {
            throw new IllegalArgumentException("Vous devez avoir au moins un membre du personnel actif");
        }

        business.setPublished(true);
        businessRepository.save(business);
        return toDto(business);
    }

    @Transactional
    public BusinessDto unpublish(String ownerUserId) {
        Business business = getBusinessEntityForOwner(ownerUserId);
        business.setPublished(false);
        businessRepository.save(business);
        return toDto(business);
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDto getDashboardSummary(String ownerUserId) {
        Business business = getBusinessEntityForOwner(ownerUserId);
        String businessId = business.getId();

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = LocalDate.now().atTime(LocalTime.MAX);

        long total = appointmentRepository.countByBusinessId(businessId);
        long today = appointmentRepository.countByBusinessIdAndStartsAtBetween(businessId, todayStart, todayEnd);
        long confirmed = appointmentRepository.countByBusinessIdAndStatus(businessId, "CONFIRMED");
        long completed = appointmentRepository.countByBusinessIdAndStatus(businessId, "COMPLETED");
        long cancelled = appointmentRepository.countByBusinessIdAndStatus(businessId, "CANCELLED");

        long activeServices = serviceRepository.findAllByBusinessIdAndActiveTrue(businessId).size();
        long activeStaff = staffRepository.findAllByBusinessIdAndActiveTrue(businessId).size();

        return DashboardSummaryDto.builder()
            .totalAppointments(total)
            .todayAppointments(today)
            .confirmedCount(confirmed)
            .completedCount(completed)
            .cancelledCount(cancelled)
            .activeServicesCount(activeServices)
            .activeStaffCount(activeStaff)
            .isPublished(business.isPublished())
            .publicUrl("/book/" + business.getSlug())
            .businessName(business.getName())
            .slug(business.getSlug())
            .build();
    }

    public BusinessDto toDto(Business b) {
        return BusinessDto.builder()
            .id(b.getId())
            .name(b.getName())
            .slug(b.getSlug())
            .category(b.getCategory())
            .description(b.getDescription())
            .phone(b.getPhone())
            .city(b.getCity())
            .address(b.getAddress())
            .timezone(b.getTimezone())
            .currency(b.getCurrency())
            .published(b.isPublished())
            .advanceNoticeHours(b.getAdvanceNoticeHours())
            .bookingHorizonDays(b.getBookingHorizonDays())
            .build();
    }
}
