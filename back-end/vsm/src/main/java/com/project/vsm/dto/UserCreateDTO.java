package com.project.vsm.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateDTO {
	@NotNull(message = "Email is required")
	@NotEmpty(message = "Email is required")
	private String email;

	@NotNull(message = "Password is required")
	@NotEmpty(message = "Password is required")
	private String password;
}
