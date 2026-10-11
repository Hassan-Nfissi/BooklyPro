package com.booklypro.repository;

import com.booklypro.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    List<Appointment> findAllByBusinessIdOrderByStartsAtDesc(String businessId);

    List<Appointment> findAllByBusinessIdAndStartsAtBetweenOrderByStartsAtAsc(
        String businessId, LocalDateTime start, LocalDateTime end
    );

    Optional<Appointment> findByBookingReference(String bookingReference);

    @Query("SELECT a FROM Appointment a WHERE a.staffId = :staffId AND a.status <> 'CANCELLED' AND a.startsAt < :endsAt AND a.endsAt > :startsAt")
    List<Appointment> findOverlappingAppointments(
        @Param("staffId") String staffId,
        @Param("startsAt") LocalDateTime startsAt,
        @Param("endsAt") LocalDateTime endsAt
    );

    @Query("SELECT a FROM Appointment a WHERE a.businessId = :businessId AND a.status <> 'CANCELLED' AND a.startsAt < :endsAt AND a.endsAt > :startsAt")
    List<Appointment> findBusinessOverlapping(
        @Param("businessId") String businessId,
        @Param("startsAt") LocalDateTime startsAt,
        @Param("endsAt") LocalDateTime endsAt
    );

    long countByBusinessId(String businessId);
    long countByBusinessIdAndStatus(String businessId, String status);
    long countByBusinessIdAndStartsAtBetween(String businessId, LocalDateTime start, LocalDateTime end);
}
