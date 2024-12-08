package com.project.vsm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.service.DashboardService;

@RestController
@RequestMapping("/admin")
public class AdminDashoardController {
	@Autowired
	private DashboardService dashboardService;

	@GetMapping("/dashboard/revenues")
	public ResponseEntity<List<Double>> getAllRevenue() {
		return new ResponseEntity<>(dashboardService.getListRevenue(), HttpStatus.OK);
	}

	@GetMapping("/dashboard/routes")
	public ResponseEntity<Map<Integer, List<Integer>>> getAllRoutes() {
		return new ResponseEntity<>(dashboardService.getRouteFrequencyData(), HttpStatus.OK);
	}

	@GetMapping("/dashboard/drivers")
	public ResponseEntity<List<Map<String, Object>>> getAllDrivers() {
		return new ResponseEntity<>(dashboardService.getDriverScheduleCountByMonth(2024), HttpStatus.OK);
	}

	@GetMapping("/dashboard/routes-tickets")
	public ResponseEntity<List<Map<String, Object>>> getAllTicketRoutes() {
		return new ResponseEntity<>(dashboardService.getRouteTicketStatistics(), HttpStatus.OK);
	}
}
