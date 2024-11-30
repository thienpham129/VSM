package com.project.vsm.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverFindScheduleByDateDTO {
	@NotNull(message = "Account ID is required")
	private Long accountId;
	
	@NotNull(message = "Start time is required")
	private LocalDate day;
}
