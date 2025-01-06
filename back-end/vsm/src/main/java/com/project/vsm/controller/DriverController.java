package com.project.vsm.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.CreateDriverDTO;
import com.project.vsm.dto.DriverUpdateDTO;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.service.DriverService;

import jakarta.validation.Valid;
import lombok.NoArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@NoArgsConstructor
public class DriverController {
	@Autowired
	private DriverService driverService;

	@GetMapping("/driver/get-all")
	public ResponseEntity<Iterable<AccountEntity>> getAllDriver() {
		return new ResponseEntity<>(driverService.getAllDriver(), HttpStatus.OK);
	}

	@GetMapping("/driver/get-driver/{id}")
	public ResponseEntity<AccountEntity> getDriverById(@PathVariable long id) {
		Optional<AccountEntity> driverEntity = driverService.getDriverById(id);
		return new ResponseEntity<>(driverEntity.get(), HttpStatus.OK);
	}

	@PostMapping("/driver/create")
	public ResponseEntity<AccountEntity> createNewDriver(@Valid @RequestBody CreateDriverDTO driverInput) {
		return new ResponseEntity<>(driverService.createNewDriver(driverInput), HttpStatus.OK);
	}

	@PutMapping("/driver/updateDriver/{id}")
	public ResponseEntity<AccountEntity> updateDriver(@PathVariable long id,
			@Valid @ModelAttribute DriverUpdateDTO driverInput) throws IOException {
		return new ResponseEntity<>(driverService.updateDriverById(id, driverInput), HttpStatus.OK);
	}
	

}
