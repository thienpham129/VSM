package com.project.vsm.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	private String color;
	private String manufactory;

	@Column(name = "year_of_manufacture")
	private int yearOfManufacture;

	@Column(name = "day_maintenance")
	private LocalDate dayMaintenance;

	@Column(name = "start_location")
	private String startLocation;

	@Column(name = "stop_location")
	private String stopLocation;

	@Column(name = "date_start")
	private LocalDate startDate;

	@ManyToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "type_id", referencedColumnName = "type_id")
	private TypeEntity type;

	@ManyToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "parking_id", referencedColumnName = "parking_id")
	private ParkingEntity parking;

	@OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<CarImageEntity> images;
}
