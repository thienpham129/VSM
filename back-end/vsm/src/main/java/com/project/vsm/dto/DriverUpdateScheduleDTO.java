package com.project.vsm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverUpdateScheduleDTO {
	@NotNull(message = "Schdule ID is required")
	private Long schduleId;
	@NotNull(message = "Status is required")
	private String status;
}
