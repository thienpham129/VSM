package com.project.vsm.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleFindDTO {
	@NotNull(message = "Account ID is required")
	private Long accountId;

	@NotNull(message = "Car ID is required")
	private Long carId;

	@NotNull(message = "Start date is required")
	private LocalDate startDate;
}
