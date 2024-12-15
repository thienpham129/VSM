package com.project.vsm.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    long paymentId;

    @Column(name = "payment_name")
    String paymentName;

    @OneToMany(mappedBy = "paymentEntity" , cascade = CascadeType.ALL)
    List<TicketEntity> tickets = new ArrayList<>();
}
