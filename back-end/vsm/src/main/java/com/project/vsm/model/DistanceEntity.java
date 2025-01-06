package com.project.vsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DistanceTicket")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DistanceEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "point1", nullable = false)
	private String point1;

	@Column(name = "point2", nullable = false)
	private String point2;

	@Column(name = "distance", nullable = false)
	private int distance;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schedule_id", referencedColumnName = "schedule_id", nullable = false)
	private ScheduleEntity schedule;

	// Constructor tiện lợi không bao gồm ID
	public DistanceEntity(String point1, String point2, int distance, ScheduleEntity schedule) {
		this.point1 = point1;
		this.point2 = point2;
		this.distance = distance;
		this.schedule = schedule;
	}
}
