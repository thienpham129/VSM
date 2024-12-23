package com.project.vsm.dto;

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
	private int surcharge;
}
