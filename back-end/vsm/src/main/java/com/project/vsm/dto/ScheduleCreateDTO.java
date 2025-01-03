package com.project.vsm.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleCreateDTO {
	@NotNull(message = "Start time is required")
	@Future(message = "Start time must be in the future")
	private LocalDateTime startTime; // Thời gian bắt đầu

	@NotNull(message = "Route ID is required")
	@Positive(message = "Route ID must be a positive number")
	private Long routeId; // ID của tuyến đường

	@NotNull(message = "Car ID is required")
	@Positive(message = "Car ID must be a positive number")
	private Long carId;
}
