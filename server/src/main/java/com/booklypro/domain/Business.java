package com.booklypro.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "businesses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Business {
    @Id
    private String id;

    @Column(nullable = false)
    private String ownerUserId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String phone;

    @Column(nullable = false)
    private String city;

    private String address;

    @Column(nullable = false)
    private String timezone;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String preferredLanguage;

    @Column(nullable = false)
    private boolean published;

    @Column(nullable = false)
    private int advanceNoticeHours;

    @Column(nullable = false)
    private int bookingHorizonDays;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onPrePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
        if (timezone == null) timezone = "Africa/Casablanca";
        if (currency == null) currency = "MAD";
        if (preferredLanguage == null) preferredLanguage = "fr";
        if (advanceNoticeHours == 0) advanceNoticeHours = 2;
        if (bookingHorizonDays == 0) bookingHorizonDays = 30;
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
