package com.project.vsm.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverUpdateDTO {

	@NotNull(message = "Name Driver is required")
	@NotEmpty(message = "Name Driver is required")
	private String firstName;

	@NotNull(message = "Name Driver is required")
	@NotEmpty(message = "Name Driver is required")
	private String lastName;

	@NotNull(message = "Name Driver is required")
	@NotEmpty(message = "Name Driver is required")
	private String dob;

	@NotNull(message = "Name Driver is required")
	@NotEmpty(message = "Name Driver is required")
	private String phoneNumber;

	@NotNull(message = "Name Driver is required")
	@NotEmpty(message = "Name Driver is required")
	private String address;

	private List<MultipartFile> images;
}
