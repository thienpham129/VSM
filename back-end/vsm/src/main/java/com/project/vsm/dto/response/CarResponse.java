package com.project.vsm.dto.response;


import com.project.vsm.model.CarEntity;
import com.project.vsm.model.TypeEntity;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

import com.project.vsm.model.CarEntity;
import com.project.vsm.model.TypeEntity;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarResponse {
    private long carId;
    private String name;
    private String plateNumber;
    private String color;
    private String manufactory;
    private int yearOfManufacture;
    private String startLocation;
    private String stopLocation;
    private LocalDate startDate;
    private int numSeat;
    private long price;
    private TypeResponse type;

    public static CarResponse mapCarResponse(CarEntity car) {
        CarResponse response = new CarResponse();
        response.setCarId(car.getCarId());
        response.setName(car.getName());
        response.setPlateNumber(car.getPlateNumber());
        response.setColor(car.getColor());
        response.setManufactory(car.getManufactory());
        response.setYearOfManufacture(car.getYearOfManufacture());
        response.setStartLocation(car.getStartLocation());
        response.setStopLocation(car.getStopLocation());
        response.setStartDate(car.getStartDate());
        response.setNumSeat(car.getType().getNumSeat());
        response.setPrice(car.getType().getPrice());

        if (car.getType() != null) {
            TypeEntity type = car.getType();
            TypeResponse typeResponse = new TypeResponse();
            typeResponse.setTypeId(type.getTypeId());
            typeResponse.setNumSeat(type.getNumSeat());
            typeResponse.setPrice(type.getPrice());
            response.setType(typeResponse);
        } else {
            response.setType(new TypeResponse());
        }
        return response;
    }
}
