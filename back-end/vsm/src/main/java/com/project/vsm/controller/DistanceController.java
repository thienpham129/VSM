package com.project.vsm.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.DistanceInputDTO;
import com.project.vsm.service.DistanceService;
import com.project.vsm.service.ShortestPathService;

@RestController
public class DistanceController {

	@Autowired
	private DistanceService distanceService;
	@Autowired
	private ShortestPathService shortestPathService;

	@PostMapping("public/distance")
	public ResponseEntity<String> addNewDistance(@RequestBody DistanceInputDTO distanceInputDTO) {
		try {
			String result = distanceService.addNewDistance(distanceInputDTO);
			return ResponseEntity.ok(result);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình xử lý.");
		}
	}

	@GetMapping("/public/shortest-path")
	public ResponseEntity<List<String>> getShortestPath(@RequestParam String startPoint,
			@RequestParam long scheduleId) {
		try {
			List<String> path = shortestPathService.findPathThroughAllPoints(startPoint, scheduleId);
			return ResponseEntity.ok(path);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonList(e.getMessage()));
		}
	}
}
