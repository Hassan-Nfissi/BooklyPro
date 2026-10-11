package com.booklypro.repository;

import com.booklypro.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    List<Customer> findAllByBusinessIdOrderByCreatedAtDesc(String businessId);
    Optional<Customer> findByBusinessIdAndEmail(String businessId, String email);
    Optional<Customer> findByBusinessIdAndPhone(String businessId, String phone);
}
