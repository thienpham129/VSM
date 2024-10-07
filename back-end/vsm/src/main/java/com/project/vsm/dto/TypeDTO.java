package com.project.vsm.dto;

import com.project.vsm.model.TypeEntity;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeDTO {

	@NotNull(message = "Number of seats is required")
	@Min(value = 1, message = "Number of seats must be greater than 0")
	private int numSeat;

	@NotNull(message = "Price is required")
	@Min(value = 1, message = "Price must be greater than 0")
	private long price;

	public TypeEntity convertToEntity(TypeDTO typeDTO) {
		TypeEntity newType = new TypeEntity();
		newType.setNumSeat(typeDTO.getNumSeat());
		newType.setPrice(typeDTO.getPrice());
		return newType;
	}
}
