package com.project.vsm.dto;

import lombok.Data;

@Data
public class DistanceInputDTO {
	private String point1;
	private String point2;
	private int distance;
	private long scheduleId;
}
