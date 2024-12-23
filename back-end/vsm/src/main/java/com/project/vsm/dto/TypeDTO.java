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
public class TypeDTO {
	
	@NotNull(message = "Name Car is required")
	@NotEmpty(message = "Name Car is required")
	private String name;

	@NotNull(message = "Number of seats is required")
	@Min(value = 1, message = "Number of seats must be greater than 0")
	private int numSeat;

}