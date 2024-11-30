package com.project.vsm.controller;

import com.project.vsm.dto.response.RouteResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.vsm.dto.RouteCreateDTO;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.service.RouteService;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;

@RestController
public class RouteController {

	@Autowired
	private RouteService routeService;

	@GetMapping("admin/routes")
	public ResponseEntity<Iterable<RouteEntity>> getAllRoutes() {
		return new ResponseEntity<>(routeService.getAllRoutes(), HttpStatus.OK);
	}

	@PostMapping("admin/routes")
	public ResponseEntity<RouteEntity> createRoute(@Valid @RequestBody RouteCreateDTO routeDTO) {
		RouteEntity route = routeService.createNewRoute(routeDTO);
		return new ResponseEntity<>(route, HttpStatus.CREATED);
	}

	@PutMapping("admin/routes/{id}")
	public ResponseEntity<RouteEntity> updateRoute(@Valid @RequestBody RouteCreateDTO routeDTO, @PathVariable long id) {
		RouteEntity route = routeService.updateRoute(id, routeDTO);
		return new ResponseEntity<>(route, HttpStatus.CREATED);
	}

	@DeleteMapping("admin/routes/{id}")
	public ResponseEntity<RouteEntity> deleteById(@PathVariable long id) {
		RouteEntity route = routeService.deteleRouteById(id);
		return new ResponseEntity<>(route, HttpStatus.CREATED);
	}

	@GetMapping("/public/route-with-schedule")
	public ResponseEntity<List<RouteResponse>> getRouteWithSchedule(
			@RequestParam(required = true) long scheduleId,
			@RequestParam(required = true) long routeId,
			@RequestParam(required = true) String startLocation,
			@RequestParam(required = true) String stopLocation,
			@RequestParam(required = true) @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate startTime) {

		List<RouteResponse> responses = routeService.getRouteWithSchedule(scheduleId, routeId, startLocation, stopLocation, startTime);
		return new ResponseEntity<>(responses, HttpStatus.OK);
	}
}
