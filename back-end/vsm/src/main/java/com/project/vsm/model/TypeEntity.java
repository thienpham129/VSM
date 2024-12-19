package com.project.vsm.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Type_Car")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "type_id", nullable = false)
	private Long id;

	@Column(name = "type_name", nullable = false)
	private String typeName;

	@Column(name = "num_seat", nullable = false)
	private int numSeats;

	@OneToMany(mappedBy = "typeEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DetailSeat> seatList;
}