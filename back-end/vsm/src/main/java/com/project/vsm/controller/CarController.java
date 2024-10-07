package com.project.vsm.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.CarCreateDTO;
import com.project.vsm.dto.CarUpdateDTO;
import com.project.vsm.model.CarEntity;
import com.project.vsm.service.CarService;

import jakarta.validation.Valid;

@RestController
public class CarController {

	@Autowired
	private CarService carService;

	@GetMapping("public/car/{id}")
	public ResponseEntity<CarEntity> getCarById(@PathVariable long id) {
		Optional<CarEntity> carEntity = carService.getCarById(id);
		return new ResponseEntity<>(carEntity.get(), HttpStatus.OK);
	}

	@PostMapping("admin/car")
	public ResponseEntity<CarEntity> createCar(@Valid @ModelAttribute CarCreateDTO carDTO) throws IOException {
		CarEntity newCar = carService.createNewCar(carDTO);
		return new ResponseEntity<>(newCar, HttpStatus.CREATED);
	}

	@GetMapping("/public/cars")
	public ResponseEntity<Iterable<CarEntity>> getAllCars() {
		return new ResponseEntity<>(carService.getAllCars(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/car/{id}")
	public ResponseEntity<CarEntity> deleteCarById(@PathVariable long id) {
		return new ResponseEntity<>(carService.deleteCarById(id), HttpStatus.OK);
	}

	@PutMapping("/admin/car/{id}")
	public ResponseEntity<CarEntity> updateCarById(@PathVariable long id, @Valid @ModelAttribute CarUpdateDTO carInput)
			throws IOException {
		return new ResponseEntity<>(carService.updateCarById(id, carInput), HttpStatus.OK);
	}

	@GetMapping("/public/cars/{typeId}")
	public ResponseEntity<List<CarEntity>> getCarByType(@PathVariable long typeId) {
		List<CarEntity> carEntity = carService.getCarByType(typeId);
		return new ResponseEntity<>(carEntity, HttpStatus.OK);
	}
}
