package com.project.vsm.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendVoucherDTO {
	@NotNull(message = "Discount of voucher is required")
	private double discount;

	@NotNull(message = "Content is required")
	private String content;
	
	@NotNull(message = "Expired date is required")
    @Future(message = "Expired date must be in the future")
    private LocalDate expiredDate;
}
