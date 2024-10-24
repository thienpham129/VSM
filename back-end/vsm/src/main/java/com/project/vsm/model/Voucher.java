package com.project.vsm.model;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "voucher")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucher_id")
    long vouderId;

    @Column(name = "discount")
    double discount;

    @Column(name = "code")
    String code;

    @Column(name = "is_valid")
    boolean isValid;

    @Column(name = "expired_date")
    LocalDateTime expiredDate;

}
