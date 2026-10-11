package com.booklypro.repository;

import com.booklypro.domain.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
    List<ServiceEntity> findAllByBusinessId(String businessId);
    List<ServiceEntity> findAllByBusinessIdAndActiveTrue(String businessId);
}
