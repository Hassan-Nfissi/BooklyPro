package com.booklypro.repository;

import com.booklypro.domain.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, String> {
    Optional<Business> findByOwnerUserId(String ownerUserId);
    Optional<Business> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsBySlugAndIdNot(String slug, String id);
}
