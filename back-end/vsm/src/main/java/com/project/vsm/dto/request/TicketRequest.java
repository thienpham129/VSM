package com.project.vsm.dto.request;


import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.PaymentEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.model.VoucherEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TicketRequest {
	long typeId;
    long scheduleId;
    List<String> selectedSeat;
    String fullName;
    String phoneNumber;
    String email;
    String note;
    String voucher;
    String paymentMethod;
    String status;
    String detailAddressToPickUp;
    String detailAddressDropOff;
    String qrCode;

    public TicketEntity toEntity(AccountEntity account, PaymentEntity payment, VoucherEntity voucher, double totalPrice) {
        return TicketEntity.builder()
                .selectedSeat(String.join("," , this.selectedSeat))
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
                .QRPayment(qrCode)
                .status("Đang chờ xử lý")
                .build();
    }
}
