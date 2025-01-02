package com.project.vsm.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.ScheduleEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleResponse {
	private long id;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private String status;
	private int price;
	private long idDriver;
	private String firstNameDriver;
	private String lastNameDriver;
	private String phoneNumberDriver;
	private long idCar;
	private String nameCar;
	private String plateNumber;
	private Long idType;
	private String typeCarName;
	private int numSeats;
	private Long idRoute;
	private String startLocation;
	private String stopLocation;
	private int emptySeat;
	public static ScheduleResponse convertFromEntity(ScheduleEntity entity) {
		ScheduleResponse response = ScheduleResponse.builder().id(entity.getId()).startTime(entity.getStartTime())
				.endTime(entity.getEndTime()).status(entity.getStatus()).price(entity.getCarRoute().getPrice())
//				.idDriver(entity.getAccount().getId())
//				.firstNameDriver(entity.getAccount().getFirstName())
//				.lastNameDriver(entity.getAccount().getLastName())
//				.phoneNumberDriver(entity.getAccount().getPhoneNumber())
				.idCar(entity.getCarRoute().getCar().getCarId()).nameCar(entity.getCarRoute().getCar().getName())
				.plateNumber(entity.getCarRoute().getCar().getPlateNumber())
				.idType(entity.getCarRoute().getCar().getType().getId())
				.typeCarName(entity.getCarRoute().getCar().getType().getTypeName())
				.numSeats(entity.getCarRoute().getCar().getType().getNumSeats())
				.idRoute(entity.getCarRoute().getRoute().getId())
				.startLocation(entity.getCarRoute().getRoute().getStartLocation())
				.stopLocation(entity.getCarRoute().getRoute().getStopLocation()).build();
		if (entity.getAccount() != null) {
			System.out.println(entity.getAccount().getId());
		}
		return response;
	}
}
