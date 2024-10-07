package com.project.vsm.model;

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
@Table(name = "Parking_Lot")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "parking_id")
	private long id;

	private String name;
	private String location;

	private int capacity;
	@Column(name = "number_car")
	private int numCar;
	@Column(name = "is_empty", columnDefinition = "TINYINT(1)")
	private boolean empty;
}
