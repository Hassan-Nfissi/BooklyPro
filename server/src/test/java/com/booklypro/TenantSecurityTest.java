package com.booklypro;

import com.booklypro.dto.ServiceStaffDtos.CreateServiceRequest;
import com.booklypro.service.ServiceManagementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
@Transactional
public class TenantSecurityTest {

    @Autowired
    private ServiceManagementService serviceManagementService;

    @Test
    void shouldRejectModifyingServiceBelongingToAnotherBusiness() {
        // User u-owner-001 owns Salon Amina
        // Attempting to update a service with a fake/non-existent owner user ID must fail
        CreateServiceRequest updateReq = new CreateServiceRequest(
            "Service Piraté", "Desc", BigDecimal.valueOf(100), 30, 0, null
        );

        assertThrows(IllegalArgumentException.class, () -> {
            serviceManagementService.updateService("fake-owner-id-999", "srv-001", updateReq);
        });
    }
}
