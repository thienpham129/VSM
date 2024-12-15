package com.project.vsm.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleUpdateDTO {

	@NotNull(message = "Schdule ID is required")
	private Long schduleId;

	@NotNull(message = "Car ID is required")
	private Long carId;

	@NotNull(message = "Account ID is required")
	private Long accountId;

	@NotNull(message = "Route ID is required")
	private Long routeId;

	@NotNull(message = "Start time is required")
	@Future(message = "Start time must be in the future")
	private LocalDateTime startTime;

	private LocalDateTime endTime;

	@NotNull(message = "Status is required")
	private String status;
}
