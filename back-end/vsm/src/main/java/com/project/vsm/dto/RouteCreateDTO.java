package com.project.vsm.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteCreateDTO {
	@NotNull(message = "startLocation is required")
	@NotEmpty(message = "startLocation is required")
	private String startLocation;

	@NotNull(message = "stopLocation lot is required")
	@NotEmpty(message = "stopLocation lot is required")
	private String stopLocation;
}
