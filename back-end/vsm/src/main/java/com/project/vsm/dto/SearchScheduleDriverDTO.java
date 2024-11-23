package com.project.vsm.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchScheduleDriverDTO {

	@NotNull(message = "Account ID is required")
	private Long accountId;

	@NotNull(message = "Start date is required")
	private LocalDateTime dateTime;
}
