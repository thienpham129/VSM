package com.project.vsm.dto;

import com.project.vsm.controller.model.ParkingEntity;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingDTO {
	
	@NotNull(message = "Name Parking lot is required")
	@NotEmpty(message = "Name Parking lot is required")
	private String name;

	@NotNull(message = "Location Parking lot is required")
	@NotEmpty(message = "Location Parking lot is required")
	private String location;

	@NotNull(message = "Capacity Parking lot is required")
	@Min(value = 1, message = "Capacity must be greater than 0")
	private int capacity;

	public ParkingEntity convertToEntity() {
		ParkingEntity parkingEntity = new ParkingEntity();
		parkingEntity.setName(this.name);
		parkingEntity.setLocation(this.location);
		parkingEntity.setCapacity(this.capacity);
		return parkingEntity;
	}
}
