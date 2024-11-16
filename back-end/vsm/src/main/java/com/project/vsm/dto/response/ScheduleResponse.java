package com.project.vsm.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ScheduleResponse {
    long scheduleId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String status;
}
