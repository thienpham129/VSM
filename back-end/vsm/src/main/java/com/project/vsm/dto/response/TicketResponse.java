package com.project.vsm.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.TicketEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TicketResponse {
    long ticketId;
    int selectedSeat;
    double totalPrice;
    String fullName;
    String phoneNumber;
    String email;
    String note;
    boolean isPaid;
    String startLocation;
    String stopLocation;
    String status;
    String QRPayment;
    String paymentMethod;
    ScheduleResponse scheduleResponse;
    String paymentUrl;
    String qrCodeBase64;

    public static TicketResponse fromEntity(TicketEntity ticket) {
        return TicketResponse.builder()
                .ticketId(ticket.getTicketId())
                .selectedSeat(ticket.getSelectedSeat())
                .totalPrice(ticket.getPrice())
                .fullName(ticket.getFullName())
                .phoneNumber(ticket.getPhoneNumber())
                .email(ticket.getEmail())
                .note(ticket.getNote())
                .paymentMethod(ticket.getPaymentMethod())
                .startLocation(ticket.getStartLocation())
                .stopLocation(ticket.getStopLocation())
                .build();
    }

}
