package com.project.vsm.dto.response;

import com.project.vsm.model.AccountEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AccountResponse {
    long id;
    String email;
    String phoneNumber;
    String urlImage;
    

}
