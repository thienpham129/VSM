package com.project.vsm.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCarRouteDTO {

	@NotNull(message = "idRoute is required")
	@Min(value = 0, message = "idRoute must be greater than 0")
	private long idRoute;

	@NotNull(message = "idCar is required")
	@Min(value = 0, message = "idCar must be greater than 0")
	private long idCar;

	@NotNull(message = "price is required")
	@Min(value = 0, message = "price must be greater than 0")
	private int price;
}
