package com.booklypro.service;

import com.booklypro.domain.NotificationRecord;
import com.booklypro.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional
    public void sendBookingConfirmation(
        String businessId,
        String appointmentId,
        String recipientEmail,
        String customerName,
        String serviceName,
        String formattedDateTime,
        String bookingReference
    ) {
        String message = String.format(
            "Bonjour %s, votre rendez-vous pour '%s' le %s est confirmé ! Référence: %s",
            customerName, serviceName, formattedDateTime, bookingReference
        );

        log.info("[NOTIFICATION LOG] To: {} | Ref: {} | Message: {}", recipientEmail, bookingReference, message);

        NotificationRecord record = NotificationRecord.builder()
            .id(UUID.randomUUID().toString())
            .businessId(businessId)
            .appointmentId(appointmentId)
            .recipient(recipientEmail != null && !recipientEmail.isBlank() ? recipientEmail : "non-renseigné")
            .channel("LOG")
            .message(message)
            .status("SENT")
            .sentAt(LocalDateTime.now())
            .createdAt(LocalDateTime.now())
            .build();

        notificationRepository.save(record);
    }
}
