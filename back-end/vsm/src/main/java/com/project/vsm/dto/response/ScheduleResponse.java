package com.project.vsm.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.ScheduleEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.ScheduleEntity;

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
    List<TicketResponse> tickets;

    public static ScheduleResponse mapScheduleResponse(ScheduleEntity schedule , CarResponse carResponse) {
        ScheduleResponse response = new ScheduleResponse();
        response.setScheduleId(schedule.getId());
        response.setStartTime(schedule.getStartTime());
        response.setCar(carResponse);
        return response;
    }

    public static ScheduleResponse fromEntity(ScheduleEntity schedule) {
        return ScheduleResponse.builder()
                .scheduleId(schedule.getId())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .status(schedule.getStatus())
                .car(schedule.getCar() != null ? CarResponse.mapCarResponse(schedule.getCar()) : null)
                .build();
    }
}

