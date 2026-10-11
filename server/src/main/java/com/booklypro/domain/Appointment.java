package com.booklypro.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    private String id;

    @Column(nullable = false)
    private String businessId;

    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false)
    private String serviceId;

    @Column(nullable = false)
    private String staffId;

    @Column(nullable = false)
    private String serviceNameSnapshot;

    @Column(nullable = false)
    private int durationMinutesSnapshot;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMadSnapshot;

    @Column(nullable = false)
    private LocalDateTime startsAt;

    @Column(nullable = false)
    private LocalDateTime endsAt;

    @Column(nullable = false)
    private String status; // CONFIRMED, COMPLETED, CANCELLED

    @Column(nullable = false, unique = true)
    private String bookingReference;

    @Column(columnDefinition = "TEXT")
    private String customerNote;

    @Column(columnDefinition = "TEXT")
    private String cancellationReason;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onPrePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
        if (status == null) status = "CONFIRMED";
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
