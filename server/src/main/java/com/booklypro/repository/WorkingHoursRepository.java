package com.booklypro.repository;

import com.booklypro.domain.WorkingHours;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkingHoursRepository extends JpaRepository<WorkingHours, String> {
    List<WorkingHours> findAllByBusinessId(String businessId);
    List<WorkingHours> findAllByBusinessIdAndWeekday(String businessId, int weekday);
    void deleteByBusinessId(String businessId);
}
