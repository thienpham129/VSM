package com.project.vsm.controller.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Car")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarEntity {
	@Id
	@Column(name = "car_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long carId;
	private String name;
	@Column(name = "plate_number")
	private String plateNumber;
	
	@OneToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "type_id", referencedColumnName = "type_id")
	private TypeEntity type;
	
	@OneToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "parking_id", referencedColumnName = "parking_id")
	private ParkingEntity parking;
}
