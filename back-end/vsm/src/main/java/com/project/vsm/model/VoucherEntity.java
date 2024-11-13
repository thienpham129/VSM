package com.project.vsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Voucher")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherEntity {
	@Id
	@Column(name = "voucher_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long voucherID;
	private String code;
	private double discount;
	@Column(name = "is_valid")
	private boolean isValid;

	@Column(name = "created_date")
	LocalDate createdDate;

	@Column(name = "expired_date")
	LocalDate expiredDate;
}
