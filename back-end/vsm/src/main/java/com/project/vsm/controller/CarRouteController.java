package com.project.vsm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.CreateCarRouteDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarRouteEntity;
import com.project.vsm.service.CarRouteService;

import jakarta.validation.Valid;

@RestController
public class CarRouteController {
	@Autowired
	private CarRouteService carRouteService;

	@GetMapping("public/car-route")
	public ResponseEntity<Iterable<CarRouteEntity>> getAllRoutes() {
		return new ResponseEntity<>(carRouteService.getAllCarRoute(), HttpStatus.OK);
	}

	@GetMapping("public/car-route/{id}")
	public ResponseEntity<CarRouteEntity> getAllRoutesByID(@PathVariable long id) {
		return new ResponseEntity<>(carRouteService.getAllCarRouteById(id), HttpStatus.OK);
	}

	@PostMapping("admin/car-route")
	public ResponseEntity<CarRouteEntity> createCarRoute(@Valid @RequestBody CreateCarRouteDTO input) {
		CarRouteEntity carRoute = carRouteService.createNewCarRoute(input);
		return new ResponseEntity<>(carRoute, HttpStatus.CREATED);
	}

	@PutMapping("admin/car-route/{id}")
	public ResponseEntity<CarRouteEntity> updateCarRoute(@Valid @RequestBody CreateCarRouteDTO routeDTO,
			@PathVariable long id) {
		CarRouteEntity carRoute = carRouteService.updateCarRoute(id, routeDTO);
		return new ResponseEntity<>(carRoute, HttpStatus.CREATED);
	}

	@DeleteMapping("admin/car-route/{id}")
	public ResponseEntity<CarRouteEntity> deleteById(@PathVariable long id) {
		CarRouteEntity carRoute = carRouteService.deteleCarRouteById(id);
		return new ResponseEntity<>(carRoute, HttpStatus.CREATED);
	}

	@GetMapping("/public/find-car-by-route")
	public ResponseEntity<List<CarEntity>> getAllCar(@RequestParam long idRoute) {
		try {
			List<CarEntity> cars = carRouteService.findCarsByRouteId(idRoute);
			return new ResponseEntity<>(cars, HttpStatus.OK);
		} catch (InvalidInputException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
