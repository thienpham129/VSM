package com.project.vsm.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.CreateCarRouteDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarRouteEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.CarRouteRepository;
import com.project.vsm.repository.RouteRepository;

@Service
public class CarRouteService {
	@Autowired
	private CarRouteRepository crrepository;
	@Autowired
	private CarRepository carRepository;
	@Autowired
	private RouteRepository routeRepository;
	@Autowired
	private ScheduleService scheduleService;

	public CarRouteEntity findCarRouteByCarAndRoute(Long idCar, Long idRoute) {
		// Kiểm tra sự tồn tại của xe và tuyến đường
		CarEntity car = carRepository.findById(idCar)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy xe với ID: " + idCar));

		RouteEntity route = routeRepository.findById(idRoute)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy tuyến đường với ID: " + idRoute));

		// Tìm CarRouteEntity theo car và route
		CarRouteEntity carRoute = crrepository.findByCarAndRoute(car, route);

		// Nếu không tìm thấy, ném exception
		if (carRoute == null) {
			throw new RuntimeException(
					"Không tìm thấy chuyến xe với xe ID: " + idCar + " và tuyến đường ID: " + idRoute);
		}

		return carRoute;
	}

	public Iterable<CarRouteEntity> getAllCarRoute() {
		Iterable<CarRouteEntity> listRoutes = crrepository.findAll();
		return listRoutes;
	}

	public CarRouteEntity getAllCarRouteById(long idCarRoute) {
		CarRouteEntity carRoute = crrepository.findById(idCarRoute)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy carRoute với id = " + idCarRoute));
		return carRoute;
	}

	private boolean checkExistCarRoute(long carId, long routeId) {
		return !crrepository.existsByCar_CarIdAndRoute_Id(carId, routeId);
	}

	public CarRouteEntity createNewCarRoute(CreateCarRouteDTO input) {
		CarEntity car = carRepository.findById(input.getIdCar())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe với id = " + input.getIdCar()));

		RouteEntity route = routeRepository.findById(input.getIdRoute())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy route với id = " + input.getIdRoute()));
		if (!checkExistCarRoute(input.getIdCar(), input.getIdRoute())) {
			throw new InvalidInputException("Đã tồn tại chi tiết xe cho tuyến đường này");
		}
		CarRouteEntity carRoute = new CarRouteEntity();
		carRoute.setCar(car);
		carRoute.setRoute(route);
		carRoute.setPrice(input.getPrice());
		carRoute.setTime(input.getTime());
		return crrepository.save(carRoute);
	}

	public CarRouteEntity updateCarRoute(Long idCarRoute, CreateCarRouteDTO input) {

		CarRouteEntity carRoute = crrepository.findById(idCarRoute)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy carRoute với id = " + idCarRoute));
		if (input.getPrice() == carRoute.getPrice() && input.getTime() == carRoute.getTime()) {
			if (!checkExistCarRoute(input.getIdCar(), input.getIdRoute())) {
				throw new InvalidInputException("Đã tồn tại chi tiết xe cho tuyến đường này");
			}
		}
		CarEntity car = carRepository.findById(input.getIdCar())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe với id = " + input.getIdCar()));

		RouteEntity route = routeRepository.findById(input.getIdRoute())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy route với id = " + input.getIdRoute()));

		carRoute.setCar(car);
		carRoute.setRoute(route);
		carRoute.setPrice(input.getPrice());
		carRoute.setTime(input.getTime());
		return crrepository.save(carRoute);
	}

	public CarRouteEntity deteleCarRouteById(long idCarRoute) {
		CarRouteEntity carRoute = crrepository.findById(idCarRoute)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy carRoute với id = " + idCarRoute));
		crrepository.deleteById(idCarRoute);
		return carRoute;
	}

	public List<CarEntity> findCarsByRouteId(Long routeId) {
		// Tìm tất cả các CarRouteEntity có routeId trùng
		List<CarRouteEntity> carRoutes = crrepository.findByRoute_Id(routeId);
		// Nếu không tìm thấy tuyến đường hoặc xe
		if (carRoutes.isEmpty()) {
			throw new InvalidInputException("No cars found for route ID: " + routeId);
		}
		// Lấy danh sách các chiếc xe từ danh sách carRoutes
		return carRoutes.stream().map(CarRouteEntity::getCar).collect(Collectors.toList());
	}

	public List<CarEntity> findAvailableCarsByRouteAndTime(LocalDateTime time, Long routeId) {
		// Lấy tất cả các xe thuộc tuyến đường (routeId)
		List<CarEntity> allCars = findCarsByRouteId(routeId);
		// Lấy danh sách các xe có trong lịch trình (đã được sử dụng)
		List<CarEntity> carsInSchedules = scheduleService.findCarsInScheduleWithinTimeRangeAndRoute(time, routeId);
		// Trừ các xe có trong lịch trình khỏi danh sách tất cả các xe
		List<CarEntity> availableCars = allCars.stream().filter(car -> !carsInSchedules.contains(car))
				.collect(Collectors.toList());
		return availableCars;
	}
}
