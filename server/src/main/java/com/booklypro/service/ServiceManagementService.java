package com.booklypro.service;

import com.booklypro.domain.Business;
import com.booklypro.domain.ServiceEntity;
import com.booklypro.dto.ServiceStaffDtos.CreateServiceRequest;
import com.booklypro.dto.ServiceStaffDtos.ServiceDto;
import com.booklypro.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceManagementService {

    private final ServiceRepository serviceRepository;
    private final BusinessService businessService;

    @Transactional(readOnly = true)
    public List<ServiceDto> listServices(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        return serviceRepository.findAllByBusinessId(business.getId()).stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional
    public ServiceDto createService(String ownerUserId, CreateServiceRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);

        ServiceEntity entity = ServiceEntity.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .name(request.getName().trim())
            .description(request.getDescription())
            .priceMad(request.getPriceMad())
            .durationMinutes(request.getDurationMinutes())
            .bufferMinutes(request.getBufferMinutes())
            .imageUrl(request.getImageUrl())
            .active(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        return toDto(serviceRepository.save(entity));
    }

    @Transactional
    public ServiceDto updateService(String ownerUserId, String serviceId, CreateServiceRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        ServiceEntity entity = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new IllegalArgumentException("Service introuvable"));

        if (!entity.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce service n'appartient pas à votre entreprise");
        }

        entity.setName(request.getName().trim());
        entity.setDescription(request.getDescription());
        entity.setPriceMad(request.getPriceMad());
        entity.setDurationMinutes(request.getDurationMinutes());
        entity.setBufferMinutes(request.getBufferMinutes());
        if (request.getImageUrl() != null) {
            entity.setImageUrl(request.getImageUrl());
        }

        return toDto(serviceRepository.save(entity));
    }

    @Transactional
    public ServiceDto toggleServiceActive(String ownerUserId, String serviceId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        ServiceEntity entity = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new IllegalArgumentException("Service introuvable"));

        if (!entity.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce service n'appartient pas à votre entreprise");
        }

        entity.setActive(!entity.isActive());
        return toDto(serviceRepository.save(entity));
    }

    public ServiceDto toDto(ServiceEntity s) {
        return ServiceDto.builder()
            .id(s.getId())
            .name(s.getName())
            .description(s.getDescription())
            .priceMad(s.getPriceMad())
            .durationMinutes(s.getDurationMinutes())
            .bufferMinutes(s.getBufferMinutes())
            .imageUrl(s.getImageUrl())
            .active(s.isActive())
            .build();
    }
}
