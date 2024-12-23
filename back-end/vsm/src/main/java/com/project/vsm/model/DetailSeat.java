package com.project.vsm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Detail_Seat")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailSeat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "seat_id", nullable = false)
	private Long id;

	@Column(name = "position", nullable = false)
	private String position; // Tên ghế (ví dụ: A1, B2)

	@Column(name = "surcharge", nullable = false)
	private int surcharge; // Phụ thu (ví dụ: 0, 10, 20)

	@ManyToOne
	@JoinColumn(name = "type_id", nullable = false)
	@JsonIgnore
	private TypeEntity typeEntity;

}
