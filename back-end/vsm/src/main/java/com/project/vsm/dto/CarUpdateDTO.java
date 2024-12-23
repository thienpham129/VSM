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
public class CarUpdateDTO {

	@NotNull(message = "Name Car is required")
	@NotEmpty(message = "Name Car is required")
	private String name;

	@NotNull(message = "plateNumber Car is required")
	@NotEmpty(message = "plateNumber Car is required")
	private String plateNumber;

	private String color;

	private String manufactory;

	private int yearOfManufacture;

	@NotNull(message = "typeID Car is required")
	@Min(value = 0, message = "typeID must be greater than 0")
	private Long typeID;
	
	private Long parkingID;

	private String dayMaintenance;

	private List<MultipartFile> images;
}
