package com.project.vsm.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDetailSeatDTO {
	@NotNull(message = "position is required")
	@NotEmpty(message = "position is required")
	private String position;

	@NotNull(message = "surcharge is required")
	@Min(value = 0, message = "surcharge must be greater than 0")
	private int surcharge;
}
