package com.project.vsm.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Entity
@RequiredArgsConstructor
@Table(name = "Account")
public class AccountEntity {
	@Id
	@Column(name = "account_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "email", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
	private String email;

	@JsonIgnore
	private String password;

	private String role;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "day_of_birth")
	private LocalDate dob;

	private String address;

	@Column(name = "verification_code")
	private String verificationCode;

	@Column(name = "verification_expiration")
	private LocalDateTime verificationCodeExpiresAt;

	@Column(name = "create_date")
	private LocalDateTime createDate;

	private boolean enabled;

	public AccountEntity(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
}

