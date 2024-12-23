package com.project.vsm.dto.response;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

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
    private int numSeat;
    private long price;
    private TypeResponse type;

//    public static CarResponse mapCarResponse(CarEntity car) {
//        CarResponse response = new CarResponse();
//        response.setCarId(car.getCarId());
//        response.setName(car.getName());
//        response.setPlateNumber(car.getPlateNumber());
//        response.setColor(car.getColor());
//        response.setManufactory(car.getManufactory());
//        response.setYearOfManufacture(car.getYearOfManufacture());
//        response.setNumSeat(car.getType().getNumSeat());
//        response.setPrice(car.getType().getPrice());
//
//        if (car.getType() != null) {
//            TypeEntity type = car.getType();
//            TypeResponse typeResponse = new TypeResponse();
//            typeResponse.setTypeId(type.getTypeId());
//            typeResponse.setNumSeat(type.getNumSeat());
//            typeResponse.setPrice(type.getPrice());
//            response.setType(typeResponse);
//        } else {
//            response.setType(new TypeResponse());
//        }
//        return response;
//    }
}
