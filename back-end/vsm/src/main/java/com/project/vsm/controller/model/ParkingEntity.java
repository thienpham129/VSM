package com.project.vsm.controller.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Parking")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_id")
    private long id;

    private String location;

    private int capacity;

    @Column(name = "is_empty", columnDefinition = "TINYINT(1)")
    private boolean empty;
}
