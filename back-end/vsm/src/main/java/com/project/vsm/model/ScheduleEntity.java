package com.project.vsm.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Schedule")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "schedule_id")
	private long id;

	@Column(name = "start_time", nullable = false)
	private LocalDateTime startTime;

	@Column(name = "end_time")
	private LocalDateTime endTime;

	@Column(name = "status", nullable = false)
	private String status;

	@Column(name = "start_location")
	private String startLocation;

	@Column(name = "stop_location")
	private String stopLocation;

	@ManyToOne
	@JoinColumn(name = "route_id", referencedColumnName = "id")
	private RouteEntity route;

	@ManyToOne
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private AccountEntity account;

	@ManyToOne()
	@JoinColumn(name = "car_id", referencedColumnName = "car_id")
	private CarEntity car;

	@OneToMany(mappedBy = "scheduleEntity" , fetch = FetchType.LAZY)
	private List<TicketEntity> tickets = new ArrayList<>();

}
