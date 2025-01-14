package com.project.vsm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleUpdateDTO {
	private Long carRouteId;

	@NotNull(message = "Account ID is required")
	private Long accountId;

	@NotNull(message = "Status is required")
	private String status;

	private Long carId;

	private Long routeId;
}
