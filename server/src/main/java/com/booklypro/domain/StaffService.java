package com.booklypro.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "staff_services", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"staff_id", "service_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffService {
    @Id
    private String id;

    @Column(name = "staff_id", nullable = false)
    private String staffId;

    @Column(name = "service_id", nullable = false)
    private String serviceId;
}
