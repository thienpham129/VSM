package com.project.vsm.repository.specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import com.project.vsm.model.ScheduleEntity;

import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ScheduleSpecification {
	private static final String FILED_START_LOCATION = "startLocation";
    private static final String FILED_END_LOCATION = "stopLocation";
    private static final String FILED_START_DATE = "startTime";
    private final List<Specification<ScheduleEntity>> specifications = new ArrayList<>();

    public static ScheduleSpecification builder() {
        return new ScheduleSpecification();
    }

    public ScheduleSpecification withStartLocation(String startLocation) {
        if (!ObjectUtils.isEmpty(startLocation)) {
            specifications.add((root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.upper(root.get(FILED_START_LOCATION)), like(startLocation)));
        }
        return this;
    }

    public ScheduleSpecification withEndLocation(String endLocation) {
        if (!ObjectUtils.isEmpty(endLocation)) {
            specifications.add((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.upper(root.get(FILED_END_LOCATION)), like(endLocation)));
        }
        return this;
    }

    public ScheduleSpecification withStartDate(LocalDate startDate) {
        if (!ObjectUtils.isEmpty(startDate)) {
            specifications.add((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get(FILED_START_DATE) , startDate));
        }
        return this;
    }

    public static String like(String value) {
        return "%" + value.toUpperCase() + "%";
    }

    public Specification<ScheduleEntity> build() {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder))
                .toArray(Predicate[]::new)));
    }
}
