package com.booklypro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BookingDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PublicBusinessDto {
        private String id;
        private String name;
        private String slug;
        private String category;
        private String description;
        private String phone;
        private String city;
        private String address;
        private String currency;
        private BusinessDtos.BrandingDto branding;
        private List<ServiceStaffDtos.ServiceDto> services;
        private List<ServiceStaffDtos.StaffDto> staff;
        private List<ServiceStaffDtos.WorkingHoursDto> workingHours;
        private int advanceNoticeHours;
        private int bookingHorizonDays;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SlotDto {
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String staffId;
        private String staffName;
        private String formattedTime;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateAppointmentRequest {
        @NotBlank(message = "Le service est requis")
        private String serviceId;

        private String staffId; // optional, can be "any" or null

        @NotNull(message = "L'horaire sélectionné est requis")
        private LocalDateTime startsAt;

        @NotBlank(message = "Le nom du client est requis")
        private String customerName;

        private String customerEmail;

        @NotBlank(message = "Le numéro de téléphone est requis")
        private String customerPhone;

        private String customerNote;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppointmentDto {
        private String id;
        private String businessId;
        private String serviceId;
        private String serviceName;
        private BigDecimal priceMad;
        private int durationMinutes;
        private LocalDateTime startsAt;
        private LocalDateTime endsAt;
        private String status;
        private String bookingReference;
        private String customerName;
        private String customerEmail;
        private String customerPhone;
        private String customerNote;
        private String staffId;
        private String staffName;
        private LocalDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CancelAppointmentRequest {
        private String cancellationReason;
    }
}
