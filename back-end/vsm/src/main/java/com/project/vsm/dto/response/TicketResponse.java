package com.project.vsm.dto.response;

import com.project.vsm.model.TicketEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
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

    public static TicketResponse fromEntity(TicketEntity ticket) {
        return TicketResponse.builder()
                .ticketId(ticket.getTicketId())
                .selectedSeat(ticket.getSelectedSeat())
                .totalPrice(ticket.getPrice())
                .fullName(ticket.getFullName())
                .phoneNumber(ticket.getPhoneNumber())
                .email(ticket.getEmail())
                .note(ticket.getNote())
                .startLocation(ticket.getStartLocation())
                .stopLocation(ticket.getStopLocation())
                .build();
    }

}
