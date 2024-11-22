package com.project.vsm.repository.specification;


import com.project.vsm.model.CarEntity;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CarSpecification {
    private static final String FILED_START_LOCATION = "startLocation";
    private static final String FILED_END_LOCATION = "stopLocation";
    private static final String FILED_START_DATE = "startDate";

    private final List<Specification<CarEntity>> specifications = new ArrayList<>();

    public static CarSpecification builder() {
        return new CarSpecification();
    }

    public CarSpecification withStartLocation(String startLocation) {
        if (!ObjectUtils.isEmpty(startLocation)) {
            specifications.add((root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.upper(root.get(FILED_START_LOCATION)), like(startLocation)));
        }
        return this;
    }

    public CarSpecification withEndLocation(String endLocation) {
        if (!ObjectUtils.isEmpty(endLocation)) {
            specifications.add((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.upper(root.get(FILED_END_LOCATION)), like(endLocation)));
        }
        return this;
    }

    public CarSpecification withStartDate(LocalDate startDate) {
        if (!ObjectUtils.isEmpty(startDate)) {
            specifications.add((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get(FILED_START_DATE) , startDate));
        }
        return this;
    }

    public static String like(String value) {
        return "%" + value.toUpperCase() + "%";
    }

    public Specification<CarEntity> build() {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder))
                .toArray(Predicate[]::new)));
    }
}
