package com.project.vsm.dto;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.model.VoucherEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketResponseAdminDTO {
	String ticketId;
	double price;
	String paymentMethod;
	boolean isPaid;
	String status;
	String QRPayment;
	String selectedSeat;
	String note;
	String email;
	String fullName;
	String phoneNumber;
	String detailAddressPickUp;
	String detailAddressDropOff;
	VoucherEntity voucher;
	ScheduleEntity scheduleEntity;
	RouteEntity route;
}
