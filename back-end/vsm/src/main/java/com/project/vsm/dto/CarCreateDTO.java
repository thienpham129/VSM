package com.project.vsm.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarCreateDTO {

	@NotNull(message = "Name Car is required")
	@NotEmpty(message = "Name Car is required")
	private String name;

	@NotNull(message = "plateNumber Car is required")
	@NotEmpty(message = "plateNumber Car is required")
	private String plateNumber;

	@NotNull(message = "color Car is required")
	@NotEmpty(message = "color Car is required")
	private String color;

	@NotNull(message = "manufactory Car is required")
	@NotEmpty(message = "manufactory Car is required")
	private String manufactory;

	@NotNull(message = "yearOfManufacture Car is required")
	@Min(value = 1900, message = "Capacity must be greater than 1900")
	private int yearOfManufacture;

	@NotNull(message = "yearOfManufacture Car is required")
	@Min(value = 0, message = "yearOfManufacture must be greater than 0")
	private Long typeID;

	@NotNull(message = "images Car is required")
	@NotEmpty(message = "images Car is required")
	private List<MultipartFile> images;
}
