package com.project.vsm.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.ScheduleEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleResponse {
    long scheduleId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String status;
    String startLocation;
    String stopLocation;
    String startDate;
    CarResponse car;

    public static ScheduleResponse mapScheduleResponse(ScheduleEntity schedule) {
        ScheduleResponse response = new ScheduleResponse();
        response.setScheduleId(schedule.getId());
        response.setStartTime(schedule.getStartTime());
        response.setStartLocation(schedule.getStartLocation());
        response.setStopLocation(schedule.getStopLocation());
        return response;
    }

}
