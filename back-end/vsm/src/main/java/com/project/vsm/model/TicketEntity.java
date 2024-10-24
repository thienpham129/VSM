package com.project.vsm.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    long ticketId;

    @Column(name = "price")
    double price;

    @Column(name = "payment_method")
    String paymentMethod;

    @Column(name = "is_paid")
    boolean isPaid;

    @Column(name = "start_localtion")
    String startLocation;

    @Column(name = "stop_location")
    String stopLocation;

    @Column(name = "status")
    String status;

    @Column(name = "qr_payment")
    String QRPayment;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    UserEntity userEntity;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "voucher_id")
    Voucher voucher;
}
