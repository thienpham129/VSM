package com.project.vsm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`User`")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long userId;

	@Column(name = "url_image")
	private String urlImage;

	@Column(name = "num_booking")
	private int numBooking;

	private String gender;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private AccountEntity account;

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<TicketEntity> ticketEntities = new ArrayList<>();
}

