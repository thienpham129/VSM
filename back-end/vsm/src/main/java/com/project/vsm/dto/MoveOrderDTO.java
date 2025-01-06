package com.project.vsm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoveOrderDTO {
	private String pickupOrder;
	private String dropoffOrder;
	private Long scheduleId;
}