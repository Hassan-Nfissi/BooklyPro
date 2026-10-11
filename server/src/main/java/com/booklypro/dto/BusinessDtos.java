package com.booklypro.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class BusinessDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BusinessDto {
        private String id;
        private String name;
        private String slug;
        private String category;
        private String description;
        private String phone;
        private String city;
        private String address;
        private String timezone;
        private String currency;
        private boolean published;
        private int advanceNoticeHours;
        private int bookingHorizonDays;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateBusinessRequest {
        @NotBlank(message = "Le nom est obligatoire")
        private String name;

        @NotBlank(message = "Le slug est obligatoire")
        private String slug;

        @NotBlank(message = "La catégorie est obligatoire")
        private String category;

        private String description;
        private String phone;

        @NotBlank(message = "La ville est obligatoire")
        private String city;

        private String address;
        private int advanceNoticeHours;
        private int bookingHorizonDays;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BrandingDto {
        private String logoUrl;
        private String coverUrl;
        private String primaryColor;
        private String themeKey;
        private String welcomeMessage;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateBrandingRequest {
        private String primaryColor;
        private String themeKey;
        private String welcomeMessage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardSummaryDto {
        private long totalAppointments;
        private long todayAppointments;
        private long confirmedCount;
        private long completedCount;
        private long cancelledCount;
        private long activeServicesCount;
        private long activeStaffCount;
        private boolean isPublished;
        private String publicUrl;
        private String businessName;
        private String slug;
    }
}
