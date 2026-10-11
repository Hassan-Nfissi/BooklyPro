package com.booklypro.repository;

import com.booklypro.domain.NotificationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationRecord, String> {
    List<NotificationRecord> findAllByBusinessIdOrderBySentAtDesc(String businessId);
}
