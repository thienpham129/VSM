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
    long scheduleId;
    int selectedSeat;
    long typeId;
    String fullName;
    String phoneNumber;
    String email;
    String note;
    String voucher;
    String paymentMethod;
    String detailAddressToPickUp;
    String detailAddressDropOff;

    public TicketEntity toEntity(AccountEntity account, PaymentEntity payment, VoucherEntity voucher, double totalPrice) {
        return TicketEntity.builder()
                .selectedSeat(this.selectedSeat)
                .detailAddressPickUp(this.detailAddressToPickUp)
                .detailAddressDropOff(this.detailAddressDropOff)
                .fullName(this.fullName)
                .phoneNumber(this.phoneNumber)
                .email(this.email)
                .note(this.note)
                .price(totalPrice)
                .voucher(voucher)
                .account(account)
                .paymentEntity(payment)
                .paymentMethod(this.paymentMethod)
                .build();
    }
}
