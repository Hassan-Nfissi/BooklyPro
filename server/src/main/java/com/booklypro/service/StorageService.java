package com.booklypro.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

public interface StorageService {
    String storeFile(MultipartFile file, String subfolder);
}

@Service
class LocalStorageService implements StorageService {

    private final Path uploadRoot;
    private static final List<String> ALLOWED_MIME_TYPES = List.of(
        "image/png", "image/jpeg", "image/jpg", "image/webp"
    );
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public LocalStorageService(@Value("${app.uploads.dir:./uploads}") String uploadDir) {
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadRoot);
        } catch (IOException e) {
            throw new RuntimeException("Impossible d'initialiser le dossier d'uploads", e);
        }
    }

    @Override
    public String storeFile(MultipartFile file, String subfolder) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("La taille du fichier dépasse la limite autorisée de 5 Mo");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Format de fichier non supporté. Formats acceptés : PNG, JPEG, WEBP");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            // Sanitize extension
            if (!List.of(".png", ".jpg", ".jpeg", ".webp").contains(extension)) {
                extension = ".png";
            }
        }

        String safeFileName = UUID.randomUUID().toString() + extension;
        Path targetDir = uploadRoot.resolve(subfolder != null ? subfolder : "general").normalize();

        try {
            Files.createDirectories(targetDir);
            Path targetFile = targetDir.resolve(safeFileName).normalize();

            // Guard against path traversal
            if (!targetFile.startsWith(uploadRoot)) {
                throw new SecurityException("Tentative d'écriture hors du répertoire autorisé");
            }

            Files.copy(file.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING);
            return "/api/v1/uploads/" + (subfolder != null ? subfolder + "/" : "") + safeFileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement du fichier", e);
        }
    }
}
