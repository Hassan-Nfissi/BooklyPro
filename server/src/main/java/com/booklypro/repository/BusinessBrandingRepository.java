package com.booklypro.repository;

import com.booklypro.domain.BusinessBranding;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusinessBrandingRepository extends JpaRepository<BusinessBranding, String> {
    Optional<BusinessBranding> findByBusinessId(String businessId);
}
