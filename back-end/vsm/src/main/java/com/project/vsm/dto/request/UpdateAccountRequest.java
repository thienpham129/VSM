package com.project.vsm.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UpdateAccountRequest {
    String urlImage;
    String gender;

    private String password;
    private String firstName;
    private String lastName;

    private LocalDate dob;
    private String address;
}
