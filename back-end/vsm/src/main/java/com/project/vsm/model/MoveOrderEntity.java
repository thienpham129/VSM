package com.project.vsm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MoveOrder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoveOrderEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "move_order_id")
	private Long id;

	@Column(name = "pickup_order", nullable = false)
	private String pickupOrder;

	@Column(name = "dropoff_order", nullable = false)
	private String dropoffOrder;

	// Liên kết 1-1 với ScheduleEntity
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "schedule_id", referencedColumnName = "schedule_id", nullable = false)
	@JsonIgnore
	private ScheduleEntity schedule;
}