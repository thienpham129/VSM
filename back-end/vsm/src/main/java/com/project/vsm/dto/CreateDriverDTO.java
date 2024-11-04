package com.project.vsm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDriverDTO {
	@NotNull(message = "Email driver is required")
	private String email;

	@NotNull(message = "Password is required")
	private String password;
}
