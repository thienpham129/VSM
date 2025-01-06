package com.project.vsm.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class VoucherResponse {
    double discount;
    String message;

    public VoucherResponse(String message) {
        this.message = message;
    }
}
