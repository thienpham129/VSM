package com.project.vsm.dto.response;

import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

    public static RouteResponse mapRouteResponse(RouteEntity route, List<ScheduleEntity> schedules) {
        RouteResponse response = new RouteResponse();
        response.setRouteId(route.getId());
        response.setStartLocation(route.getStartLocation());
        response.setStopLocation(route.getStopLocation());
        response.setSchedules(schedules.stream().map(ScheduleResponse::mapScheduleResponse).collect(Collectors.toList()));
        return response;
    }

    public static RouteResponse fromEntity(RouteEntity route) {
        return RouteResponse.builder().routeId(route.getId()).startLocation(route.getStartLocation()).stopLocation(route.getStopLocation()).build();
    }
}
