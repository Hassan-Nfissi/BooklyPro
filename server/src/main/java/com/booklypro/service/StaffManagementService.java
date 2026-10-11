package com.booklypro.service;

import com.booklypro.domain.Business;
import com.booklypro.domain.Staff;
import com.booklypro.domain.StaffService;
import com.booklypro.dto.ServiceStaffDtos.CreateStaffRequest;
import com.booklypro.dto.ServiceStaffDtos.StaffDto;
import com.booklypro.repository.StaffRepository;
import com.booklypro.repository.StaffServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StaffManagementService {

    private final StaffRepository staffRepository;
    private final StaffServiceRepository staffServiceRepository;
    private final BusinessService businessService;

    @Transactional(readOnly = true)
    public List<StaffDto> listStaff(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        return staffRepository.findAllByBusinessId(business.getId()).stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional
    public StaffDto createStaff(String ownerUserId, CreateStaffRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);

        Staff staff = Staff.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .displayName(request.getDisplayName().trim())
            .email(request.getEmail())
            .phone(request.getPhone())
            .avatarUrl(request.getAvatarUrl())
            .active(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
        staffRepository.save(staff);

        if (request.getAssignedServiceIds() != null) {
            for (String srvId : request.getAssignedServiceIds()) {
                StaffService ss = StaffService.builder()
                    .id(UUID.randomUUID().toString())
                    .staffId(staff.getId())
                    .serviceId(srvId)
                    .build();
                staffServiceRepository.save(ss);
            }
        }

        return toDto(staff);
    }

    @Transactional
    public StaffDto updateStaff(String ownerUserId, String staffId, CreateStaffRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new IllegalArgumentException("Membre du personnel introuvable"));

        if (!staff.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce membre n'appartient pas à votre entreprise");
        }

        staff.setDisplayName(request.getDisplayName().trim());
        staff.setEmail(request.getEmail());
        staff.setPhone(request.getPhone());
        if (request.getAvatarUrl() != null) {
            staff.setAvatarUrl(request.getAvatarUrl());
        }
        staffRepository.save(staff);

        if (request.getAssignedServiceIds() != null) {
            staffServiceRepository.deleteByStaffId(staff.getId());
            for (String srvId : request.getAssignedServiceIds()) {
                StaffService ss = StaffService.builder()
                    .id(UUID.randomUUID().toString())
                    .staffId(staff.getId())
                    .serviceId(srvId)
                    .build();
                staffServiceRepository.save(ss);
            }
        }

        return toDto(staff);
    }

    @Transactional
    public StaffDto toggleStaffActive(String ownerUserId, String staffId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new IllegalArgumentException("Membre introuvable"));

        if (!staff.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce membre n'appartient pas à votre entreprise");
        }

        staff.setActive(!staff.isActive());
        return toDto(staffRepository.save(staff));
    }

    public StaffDto toDto(Staff s) {
        List<String> assigned = staffServiceRepository.findAllByStaffId(s.getId()).stream()
            .map(StaffService::getServiceId)
            .toList();

        return StaffDto.builder()
            .id(s.getId())
            .displayName(s.getDisplayName())
            .email(s.getEmail())
            .phone(s.getPhone())
            .avatarUrl(s.getAvatarUrl())
            .active(s.isActive())
            .assignedServiceIds(assigned)
            .build();
    }
}
