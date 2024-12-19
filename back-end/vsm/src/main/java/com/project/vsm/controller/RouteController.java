package com.project.vsm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.RouteCreateDTO;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.service.RouteService;

import jakarta.validation.Valid;

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

	/*
	 * @GetMapping("/public/route/search") public
	 * ResponseEntity<List<RouteResponse>> getRouteWithSchedule(
	 * 
	 * @RequestParam(required = true) String startLocation,
	 * 
	 * @RequestParam(required = true) String stopLocation,
	 * 
	 * @RequestParam(required = true) @DateTimeFormat(pattern = "dd-MM-yyyy")
	 * LocalDate startTime) {
	 * 
	 * List<RouteResponse> responses = routeService.getRouteWithSchedule(
	 * startLocation, stopLocation, startTime); return new
	 * ResponseEntity<>(responses, HttpStatus.OK); }
	 */
}
