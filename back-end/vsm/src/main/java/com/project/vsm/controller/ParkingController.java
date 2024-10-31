package com.project.vsm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.ParkingDTO;
import com.project.vsm.model.ParkingEntity;
import com.project.vsm.service.ParkingService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class ParkingController {

	@Autowired
	private ParkingService parkingService;

	@PostMapping("/parking")
	public ResponseEntity<ParkingEntity> createNewParking(@Valid @RequestBody ParkingDTO parkingInput) {
		return new ResponseEntity<>(parkingService.createNewParking(parkingInput), HttpStatus.OK);
	}

	@GetMapping("/parking/{id}")
	public ResponseEntity<ParkingEntity> getParkingById(@PathVariable long id) {
		Optional<ParkingEntity> parkingEntity = parkingService.getParkingById(id);
		return new ResponseEntity<>(parkingEntity.get(), HttpStatus.OK);
	}

	@GetMapping("/parkings")
	public ResponseEntity<Iterable<ParkingEntity>> getAllParking() {
		return new ResponseEntity<>(parkingService.getAllParkings(), HttpStatus.OK);
	}

	@PutMapping("/parking/{id}")
	public ResponseEntity<ParkingEntity> updateParkingById(@PathVariable long id,
			@Valid @RequestBody ParkingDTO parkingInput) {
		return new ResponseEntity<>(parkingService.updateParkingById(id, parkingInput), HttpStatus.OK);
	}

	@DeleteMapping("/parking/{id}")
	public ResponseEntity<ParkingEntity> deleteParkingById(@PathVariable long id) {
		return new ResponseEntity<>(parkingService.deleteParkingById(id), HttpStatus.OK);
	}
}
