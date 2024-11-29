package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.RouteCreateDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.repository.RouteRepository;

@Service
public class RouteService {

	@Autowired
	private RouteRepository routeRepository;

	public Iterable<RouteEntity> getAllRoutes() {
		Iterable<RouteEntity> listRoutes = routeRepository.findAll();
		return listRoutes;
	}

	public RouteEntity createNewRoute(RouteCreateDTO routeInput) {
		RouteEntity newRoute = new RouteEntity();
		newRoute.setStartLocation(routeInput.getStartLocation());
		newRoute.setStopLocation(routeInput.getStopLocation());
		if (routeInput.getStartLocation().equalsIgnoreCase(routeInput.getStopLocation())) {
			throw new InvalidInputException("Điểm bắt đầu và kết thúc phải khác nhau");
		}
		if (routeRepository.existsByStartLocationAndStopLocation(routeInput.getStartLocation(),
				routeInput.getStopLocation())) {
			throw new InvalidInputException(
					"Đã tồn tại tuyến đường với " + routeInput.getStartLocation() + ">" + routeInput.getStopLocation());
		}
		return routeRepository.save(newRoute);
	}

	public RouteEntity updateRoute(long id, RouteCreateDTO routeInput) {
		Optional<RouteEntity> optionalRoute = routeRepository.findById(id);
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found route with id " + id);
		}
		if (routeRepository.existsByStartLocationAndStopLocation(routeInput.getStartLocation(),
				routeInput.getStopLocation())) {
			throw new InvalidInputException(
					"Đã tồn tại tuyến đường với " + routeInput.getStartLocation() + ">" + routeInput.getStopLocation());
		}
		if (routeInput.getStartLocation().equalsIgnoreCase(routeInput.getStopLocation())) {
			throw new InvalidInputException("Điểm bắt đầu và kết thúc phải khác nhau");
		}
		optionalRoute.get().setStartLocation(routeInput.getStartLocation());
		optionalRoute.get().setStopLocation(routeInput.getStopLocation());
		return routeRepository.save(optionalRoute.get());
	}

	public RouteEntity deteleRouteById(long id) {
		Optional<RouteEntity> optionalRoute = routeRepository.findById(id);
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found route with id " + id);
		}
		routeRepository.delete(optionalRoute.get());
		return optionalRoute.get();
	}
}
