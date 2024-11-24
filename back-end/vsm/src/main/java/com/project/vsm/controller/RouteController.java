package com.project.vsm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.model.RouteEntity;
import com.project.vsm.service.RouteService;

@RestController
public class RouteController {

	@Autowired
	private RouteService routeService;

	@GetMapping("admin/routes")
	public ResponseEntity<Iterable<RouteEntity>> getAllRoutes() {
		return new ResponseEntity<>(routeService.getAllRoutes(), HttpStatus.OK);
	}
}
