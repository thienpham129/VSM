package com.project.vsm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverUpdateParkingDTO {
	@NotNull(message = "Account ID is required")
	private Long accountId;

	@NotNull(message = "Account ID is required")
	private Long parkingId;
}
