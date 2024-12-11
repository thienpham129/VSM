package com.project.vsm.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Schedule")
@Getter
@Setter
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


	@ManyToOne
	@JoinColumn(name = "route_id", referencedColumnName = "id")
	private RouteEntity route;

	@ManyToOne
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private AccountEntity account;

	@ManyToOne()
	@JoinColumn(name = "car_id", referencedColumnName = "car_id")
	private CarEntity car;

	@JsonIgnore
	@OneToMany(mappedBy = "scheduleEntity", fetch = FetchType.LAZY)
	private List<TicketEntity> tickets = new ArrayList<>();

	@Override
	public String toString() {
		return "ScheduleEntity [id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", status=" + status
				+ ", startLocation=" + startLocation + ", stopLocation=" + stopLocation + ", route=" + route
				+ ", account=" + account + ", car=" + car + ", tickets=" + tickets + "]";
	}

}
