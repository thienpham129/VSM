package com.project.vsm.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketResponseDTO {
	private String ticketId;
	private double priceTicket;
	private boolean isPaid;
	private String statusTicket;
	private String selectSeat;
	private String note;
	private String email;
	private String fullName;
	private String phoneNumber;
	private String addressPickup;
	private String addressDropOff;

	private long idSchedule;
	private LocalDateTime startTime;
	private String statusSchedule;

	private long carId;
	private String carName;

	private long routeId;
	private String startLocation;
	private String stopLocation;
}
