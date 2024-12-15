package com.project.vsm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateTicketDTO {
	private String ticketId;
	private String fullName;
	private String email;
	private String phoneNumber;
	private String detailAddressPickUp;
	private String detailAddressDropOff;
	private String note;
	private boolean paid;
	private String status;
}
