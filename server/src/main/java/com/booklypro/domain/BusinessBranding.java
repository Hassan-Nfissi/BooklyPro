package com.booklypro.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "business_branding")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusinessBranding {
    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String businessId;

    private String logoUrl;
    private String coverUrl;

    @Column(nullable = false)
    private String primaryColor;

    @Column(nullable = false)
    private String themeKey;

    @Column(columnDefinition = "TEXT")
    private String welcomeMessage;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onPrePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
        if (primaryColor == null) primaryColor = "#0284c7";
        if (themeKey == null) themeKey = "emerald";
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
