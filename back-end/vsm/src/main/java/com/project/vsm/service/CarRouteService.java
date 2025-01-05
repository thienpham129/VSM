package com.project.vsm.service;

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

}
