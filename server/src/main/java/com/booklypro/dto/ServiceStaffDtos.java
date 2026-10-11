package com.booklypro.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class ServiceStaffDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceDto {
        private String id;
        private String name;
        private String description;
        private BigDecimal priceMad;
        private int durationMinutes;
        private int bufferMinutes;
        private String imageUrl;
        private boolean active;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateServiceRequest {
        @NotBlank(message = "Le nom du service est obligatoire")
        private String name;

        private String description;

        @NotNull(message = "Le prix est obligatoire")
        @DecimalMin(value = "0.0", inclusive = true, message = "Le prix doit être positif")
        private BigDecimal priceMad;

        @Min(value = 5, message = "La durée minimale est de 5 minutes")
        private int durationMinutes;

        private int bufferMinutes;
        private String imageUrl;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StaffDto {
        private String id;
        private String displayName;
        private String email;
        private String phone;
        private String avatarUrl;
        private boolean active;
        private List<String> assignedServiceIds;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateStaffRequest {
        @NotBlank(message = "Le nom de l'employé est obligatoire")
        private String displayName;

        private String email;
        private String phone;
        private String avatarUrl;
        private List<String> assignedServiceIds;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkingHoursDto {
        private String id;
        private int weekday;
        private LocalTime startTime;
        private LocalTime endTime;
        private boolean closed;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateWorkingHoursRequest {
        private List<WorkingHoursDto> hours;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeOffDto {
        private String id;
        private LocalDateTime startsAt;
        private LocalDateTime endsAt;
        private String reason;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTimeOffRequest {
        @NotNull(message = "La date de début est obligatoire")
        private LocalDateTime startsAt;

        @NotNull(message = "La date de fin est obligatoire")
        private LocalDateTime endsAt;

        private String reason;
    }
}
