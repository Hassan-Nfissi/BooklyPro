package com.booklypro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class AuthDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GoogleAuthRequest {
        @NotBlank(message = "L'ID token Google est obligatoire")
        private String idToken;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DevLoginRequest {
        private String email;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        @NotBlank(message = "L'email est requis")
        @Email(message = "Format d'email invalide")
        private String email;

        @NotBlank(message = "Le mot de passe est requis")
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "Le nom complet est requis")
        private String fullName;

        @NotBlank(message = "L'email est requis")
        @Email(message = "Format d'email invalide")
        private String email;

        @NotBlank(message = "Le mot de passe est requis")
        private String password;

        @NotBlank(message = "Le nom de l'entreprise est requis")
        private String businessName;

        @NotBlank(message = "La catégorie est requise")
        private String category;

        @NotBlank(message = "La ville est requise")
        private String city;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private UserDto user;
        private BusinessDtos.BusinessDto business;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDto {
        private String id;
        private String fullName;
        private String email;
        private String role;
    }
}
