package com.project.vsm.dto.response;


import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarResponse {
    long carId;
    String carName;
    String plateNumber;
    String startLocation;
    String stopLocation;
    LocalDate startDate;
}
