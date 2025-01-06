package com.project.vsm.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@RequiredArgsConstructor
@Table(name = "Account")
public class AccountEntity {
	@Id
	@Column(name = "account_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "url_image")
	private String urlImage;

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

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "verification_code")
	private String verificationCode;
	@Column(name = "verification_expiration")
	private LocalDateTime verificationCodeExpiresAt;
	@Column(name = "create_date")
	private LocalDateTime createDate;

	private boolean enabled;

	private String gender;

	@Column(name = "img_driver_lisence_2")
	private String imgDriverLisence1;

	@Column(name = "img_driver_lisence_1")
	private String imgDriverLisence2;

	@Column(name = "is_available")
	private boolean isAvailable;

	@JsonIgnore
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	private List<TicketEntity> tickets = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	private List<ScheduleEntity> schedules = new ArrayList<>();

	@OneToMany(mappedBy = "account" , cascade = CascadeType.ALL)
	private List<FeedbackEntity> feedbacks = new ArrayList<>();

	public AccountEntity(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
}