package com.project.vsm.dto.request;


import com.project.vsm.model.CarEntity;
import com.project.vsm.repository.specification.CarSpecification;
import com.project.vsm.util.FilterRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@EqualsAndHashCode(callSuper = true)
public class CarSearchRequest extends FilterRequest<CarEntity> {
    String startLocation;
    String stopLocation;
    LocalDateTime startDate;

    @Override
    public Specification<CarEntity> specification() {
        return CarSpecification.builder()
                .withStartLocation(startLocation)
                .withEndLocation(stopLocation)
                .withStartDate(startDate).
                build();
    }
}
