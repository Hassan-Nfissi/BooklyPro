package com.booklypro.repository;

import com.booklypro.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, String> {
    List<Staff> findAllByBusinessId(String businessId);
    List<Staff> findAllByBusinessIdAndActiveTrue(String businessId);
}
