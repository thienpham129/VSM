package com.project.vsm.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TicketEntity {

    @Id
    @Column(name = "ticket_id", nullable = false, unique = true, length = 10)
    String ticketId;

	@Column(name = "price")
	double price;

    @Column(name = "payment_method")
    String paymentMethod;

	@Column(name = "is_paid")
	boolean isPaid;

	@Column(name = "start_location")
	String startLocation;

	@Column(name = "stop_location")
	String stopLocation;

	@Column(name = "status")
	String status;

	@Column(name = "qr_payment")
	String QRPayment;

	@Column(name = "selected_seat")
	String selectedSeat;

	@Column(name = "note")
	String note;

	@Column(name = "email")
	String email;

	@Column(name = "fullname")
	String fullName;

	@Column(name = "phone_number")
	String phoneNumber;

	@Column(name = "detail_address_pick_up")
	String detailAddressPickUp;

	@Column(name = "detail_address_drop_off")
	String detailAddressDropOff;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "voucher_id")
	VoucherEntity voucher;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "payment_id")
	PaymentEntity paymentEntity;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id")
	AccountEntity account;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    ScheduleEntity scheduleEntity;

    @PrePersist
    private void generateShortUuid() {
        this.ticketId = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }
}
