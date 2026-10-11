package com.booklypro.repository;

import com.booklypro.domain.StaffService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StaffServiceRepository extends JpaRepository<StaffService, String> {
    List<StaffService> findAllByStaffId(String staffId);
    List<StaffService> findAllByServiceId(String serviceId);
    void deleteByStaffId(String staffId);
    boolean existsByStaffIdAndServiceId(String staffId, String serviceId);
}
