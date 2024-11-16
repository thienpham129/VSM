package com.project.vsm.dto.request;


import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.PaymentEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.model.VoucherEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TicketRequest {
    int selectedSeat;
    String fullName;
    String phoneNumber;
    String email;
    String note;
    String startLocation;
    String stopLocation;
    String voucher;
    String paymentMethod;

    public TicketEntity toEntity(AccountEntity account, PaymentEntity payment, VoucherEntity voucher, double totalPrice) {
        return TicketEntity.builder()
                .selectedSeat(this.selectedSeat)
                .fullName(this.fullName)
                .phoneNumber(this.phoneNumber)
                .email(this.email)
                .note(this.note)
                .startLocation(this.startLocation)
                .stopLocation(this.stopLocation)
                .price(totalPrice)
                .voucher(voucher)
                .account(account)
                .paymentEntity(payment)
                .paymentMethod(this.paymentMethod)
                .build();
    }
}
