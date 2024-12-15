package com.project.vsm.dto.response;

import com.project.vsm.model.CarEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RouteResponse {
    long routeId;
    String startLocation;
    String stopLocation;
    List<ScheduleResponse> schedules;
    private CarResponse car;
    public static RouteResponse mapRouteResponse(RouteEntity route, List<ScheduleResponse> scheduleResponses) {
        RouteResponse response = new RouteResponse();
        response.setRouteId(route.getId());
        response.setStartLocation(route.getStartLocation());
        response.setStopLocation(route.getStopLocation());
        response.setSchedules(scheduleResponses);
        return response;
    }

    public static RouteResponse fromEntity(RouteEntity route) {
        return RouteResponse.builder().routeId(route.getId()).startLocation(route.getStartLocation()).stopLocation(route.getStopLocation()).build();
    }
}
