package com.project.vsm.dto.response;

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
    double price;
    String paymentMethod;
    boolean isPaid;
    String startLocation;
    String stopLocation;
    String status;
    String QRPayment;
}
