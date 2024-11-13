package com.project.vsm.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TicketRequest {
    private int selectedSeat;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String note;
    private String startLocation;
    private String stopLocation;
    private Long carId;
    String voucher;
}
