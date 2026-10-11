package com.booklypro.service;

import com.booklypro.domain.Business;
import com.booklypro.domain.TimeOff;
import com.booklypro.domain.WorkingHours;
import com.booklypro.dto.ServiceStaffDtos.*;
import com.booklypro.repository.TimeOffRepository;
import com.booklypro.repository.WorkingHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final WorkingHoursRepository workingHoursRepository;
    private final TimeOffRepository timeOffRepository;
    private final BusinessService businessService;

    @Transactional(readOnly = true)
    public List<WorkingHoursDto> getWorkingHours(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        return workingHoursRepository.findAllByBusinessId(business.getId()).stream()
            .sorted(Comparator.comparingInt(WorkingHours::getWeekday))
            .map(this::toDto)
            .toList();
    }

    @Transactional
    public List<WorkingHoursDto> updateWorkingHours(String ownerUserId, UpdateWorkingHoursRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);

        if (request.getHours() != null) {
            for (WorkingHoursDto dto : request.getHours()) {
                List<WorkingHours> existingList = workingHoursRepository.findAllByBusinessIdAndWeekday(business.getId(), dto.getWeekday());
                if (!existingList.isEmpty()) {
                    WorkingHours wh = existingList.get(0);
                    wh.setStartTime(dto.getStartTime());
                    wh.setEndTime(dto.getEndTime());
                    wh.setClosed(dto.isClosed());
                    workingHoursRepository.save(wh);
                } else {
                    WorkingHours wh = WorkingHours.builder()
                        .id(UUID.randomUUID().toString())
                        .businessId(business.getId())
                        .weekday(dto.getWeekday())
                        .startTime(dto.getStartTime())
                        .endTime(dto.getEndTime())
                        .closed(dto.isClosed())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                    workingHoursRepository.save(wh);
                }
            }
        }

        return getWorkingHours(ownerUserId);
    }

    @Transactional(readOnly = true)
    public List<TimeOffDto> listTimeOff(String ownerUserId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        return timeOffRepository.findAllByBusinessId(business.getId()).stream()
            .sorted(Comparator.comparing(TimeOff::getStartsAt))
            .map(t -> TimeOffDto.builder()
                .id(t.getId())
                .startsAt(t.getStartsAt())
                .endsAt(t.getEndsAt())
                .reason(t.getReason())
                .build())
            .toList();
    }

    @Transactional
    public TimeOffDto createTimeOff(String ownerUserId, CreateTimeOffRequest request) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);

        if (request.getEndsAt().isBefore(request.getStartsAt())) {
            throw new IllegalArgumentException("La date de fin doit être postérieure à la date de début");
        }

        TimeOff timeOff = TimeOff.builder()
            .id(UUID.randomUUID().toString())
            .businessId(business.getId())
            .startsAt(request.getStartsAt())
            .endsAt(request.getEndsAt())
            .reason(request.getReason())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        TimeOff saved = timeOffRepository.save(timeOff);
        return TimeOffDto.builder()
            .id(saved.getId())
            .startsAt(saved.getStartsAt())
            .endsAt(saved.getEndsAt())
            .reason(saved.getReason())
            .build();
    }

    @Transactional
    public void deleteTimeOff(String ownerUserId, String timeOffId) {
        Business business = businessService.getBusinessEntityForOwner(ownerUserId);
        TimeOff timeOff = timeOffRepository.findById(timeOffId)
            .orElseThrow(() -> new IllegalArgumentException("Congé introuvable"));

        if (!timeOff.getBusinessId().equals(business.getId())) {
            throw new SecurityException("Ce congé n'appartient pas à votre entreprise");
        }

        timeOffRepository.delete(timeOff);
    }

    public WorkingHoursDto toDto(WorkingHours wh) {
        return WorkingHoursDto.builder()
            .id(wh.getId())
            .weekday(wh.getWeekday())
            .startTime(wh.getStartTime())
            .endTime(wh.getEndTime())
            .closed(wh.isClosed())
            .build();
    }
}
