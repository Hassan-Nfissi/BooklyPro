package com.booklypro.service;

import com.booklypro.domain.*;
import com.booklypro.dto.AuthDtos.*;
import com.booklypro.dto.BusinessDtos.BusinessDto;
import com.booklypro.repository.*;
import com.booklypro.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final BusinessBrandingRepository brandingRepository;
    private final StaffRepository staffRepository;
    private final WorkingHoursRepository workingHoursRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GoogleTokenVerifierService googleTokenVerifierService;

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
            .orElseThrow(() -> new IllegalArgumentException("Identifiants invalides"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Identifiants invalides");
        }

        return createAuthResponse(user);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Cet email est déjà utilisé");
        }

        String rawSlug = request.getBusinessName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        if (rawSlug.isBlank()) {
            rawSlug = "business-" + UUID.randomUUID().toString().substring(0, 6);
        }
        String slug = rawSlug;
        int counter = 1;
        while (businessRepository.existsBySlug(slug)) {
            slug = rawSlug + "-" + counter++;
        }

        User user = User.builder()
            .id(UUID.randomUUID().toString())
            .fullName(request.getFullName().trim())
            .email(email)
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .role("OWNER")
            .enabled(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        userRepository.save(user);

        Business business = Business.builder()
            .id(UUID.randomUUID().toString())
            .ownerUserId(user.getId())
            .name(request.getBusinessName().trim())
            .slug(slug)
            .category(request.getCategory())
            .description("Bienvenue chez " + request.getBusinessName().trim())
            .city(request.getCity().trim())
            .timezone("Africa/Casablanca")
            .currency("MAD")
            .preferredLanguage("fr")
            .published(false)
            .advanceNoticeHours(2)
            .bookingHorizonDays(30)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        businessRepository.save(business);

        BusinessBranding branding = BusinessBranding.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .primaryColor("#0d9488")
            .themeKey("emerald")
            .welcomeMessage("Prenez rendez-vous en ligne simplement et rapidement.")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        brandingRepository.save(branding);

        Staff defaultStaff = Staff.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .displayName(user.getFullName())
            .email(user.getEmail())
            .active(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        staffRepository.save(defaultStaff);

        // Default working hours: Mon - Sat 9:00 - 19:00, Sun closed
        for (int day = 1; day <= 7; day++) {
            WorkingHours wh = WorkingHours.builder()
                .id(UUID.randomUUID().toString())
                .businessId(business.getId())
                .weekday(day)
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(19, 0))
                .closed(day == 7)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
            workingHoursRepository.save(wh);
        }

        return createAuthResponse(user);
    }

    @Transactional
    public AuthResponse googleAuth(GoogleAuthRequest request) {
        GoogleTokenVerifierService.GoogleUserInfo info = googleTokenVerifierService.verifyToken(request.getIdToken());
        if (info == null || info.email() == null) {
            throw new IllegalArgumentException("Le jeton Google fourni est invalide ou expiré");
        }

        String email = info.email().toLowerCase().trim();
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            String name = (info.name() != null && !info.name().isBlank()) ? info.name().trim() : "Utilisateur Google";
            User newUser = User.builder()
                .id(UUID.randomUUID().toString())
                .fullName(name)
                .email(email)
                .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                .role("OWNER")
                .enabled(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
            userRepository.save(newUser);

            String baseSlug = name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
            if (baseSlug.isBlank()) baseSlug = "salon-" + UUID.randomUUID().toString().substring(0, 6);
            String slug = baseSlug;
            int counter = 1;
            while (businessRepository.existsBySlug(slug)) {
                slug = baseSlug + "-" + counter++;
            }

            Business business = Business.builder()
                .id(UUID.randomUUID().toString())
                .ownerUserId(newUser.getId())
                .name("Salon " + name)
                .slug(slug)
                .category("hair_salon")
                .description("Bienvenue sur la page de réservation de " + name)
                .city("Casablanca")
                .timezone("Africa/Casablanca")
                .currency("MAD")
                .preferredLanguage("fr")
                .published(false)
                .advanceNoticeHours(2)
                .bookingHorizonDays(30)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
            businessRepository.save(business);

            BusinessBranding branding = BusinessBranding.builder()
                .id(UUID.randomUUID().toString())
                .businessId(business.getId())
                .primaryColor("#0d9488")
                .themeKey("emerald")
                .welcomeMessage("Prenez rendez-vous en ligne en quelques clics.")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
            brandingRepository.save(branding);

            Staff defaultStaff = Staff.builder()
                .id(UUID.randomUUID().toString())
                .businessId(business.getId())
                .displayName(name)
                .email(email)
                .active(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
            staffRepository.save(defaultStaff);

            for (int day = 1; day <= 7; day++) {
                WorkingHours wh = WorkingHours.builder()
                    .id(UUID.randomUUID().toString())
                    .businessId(business.getId())
                    .weekday(day)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(19, 0))
                    .closed(day == 7)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
                workingHoursRepository.save(wh);
            }

            return newUser;
        });

        return createAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse devLogin(DevLoginRequest request) {
        String targetEmail = (request != null && request.getEmail() != null && !request.getEmail().isBlank())
            ? request.getEmail().toLowerCase().trim()
            : "owner@salonamina.ma";

        User user = userRepository.findByEmail(targetEmail)
            .orElseGet(() -> userRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new IllegalStateException("Aucun utilisateur disponible pour le dev-login")));

        return createAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse getMe(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {
        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());

        Business business = businessRepository.findByOwnerUserId(user.getId()).orElse(null);
        BusinessDto businessDto = null;
        if (business != null) {
            businessDto = BusinessDto.builder()
                .id(business.getId())
                .name(business.getName())
                .slug(business.getSlug())
                .category(business.getCategory())
                .description(business.getDescription())
                .phone(business.getPhone())
                .city(business.getCity())
                .address(business.getAddress())
                .timezone(business.getTimezone())
                .currency(business.getCurrency())
                .published(business.isPublished())
                .advanceNoticeHours(business.getAdvanceNoticeHours())
                .bookingHorizonDays(business.getBookingHorizonDays())
                .build();
        }

        return AuthResponse.builder()
            .token(token)
            .user(UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build())
            .business(businessDto)
            .build();
    }
}
