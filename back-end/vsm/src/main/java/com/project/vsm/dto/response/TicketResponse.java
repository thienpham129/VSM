package com.project.vsm.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.TicketEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TicketResponse {
	String ticketId;
	List<String> selectedSeat;
	double totalPrice;
	String fullName;
	String phoneNumber;
	String email;
	String note;
	boolean isPaid;
	String status;
	String QRPayment;
	String paymentMethod;
	ScheduleResponse schedules;
	String paymentUrl;
	String qrCodeBase64;
	LocalDateTime startTime;
	LocalDateTime endTime;
	String detailAddressToPickUp;
	String detailAddressDropOff;
	String mapPickUp;
	String mapDrop;
	String mapStatus;

	public static TicketResponse fromEntity(TicketEntity ticket) {
		return TicketResponse.builder().ticketId(ticket.getTicketId())
				.selectedSeat(Arrays.asList(ticket.getSelectedSeat().split(",")))
				.totalPrice(ticket.getPrice())
				.detailAddressToPickUp(ticket.getDetailAddressPickUp())
				.detailAddressDropOff(ticket.getDetailAddressDropOff()).fullName(ticket.getFullName())
				.phoneNumber(ticket.getPhoneNumber()).email(ticket.getEmail()).note(ticket.getNote())
				.paymentMethod(ticket.getPaymentMethod())		
				.schedules(ScheduleResponse.convertFromEntity(ticket.getScheduleEntity()))
				.startTime(ticket.getScheduleEntity().getStartTime()).endTime(ticket.getScheduleEntity().getEndTime())
				.status(ticket.getStatus()).mapPickUp(ticket.getMapPickUp()).mapDrop(ticket.getMapDrop())
				.mapStatus(ticket.getMapStatus()).isPaid(ticket.isPaid()).build();
	}

}
