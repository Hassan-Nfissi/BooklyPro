package com.booklypro.repository;

import com.booklypro.domain.TimeOff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TimeOffRepository extends JpaRepository<TimeOff, String> {
    List<TimeOff> findAllByBusinessId(String businessId);
    List<TimeOff> findAllByBusinessIdAndStartsAtLessThanEqualAndEndsAtGreaterThanEqual(String businessId, LocalDateTime end, LocalDateTime start);
}
