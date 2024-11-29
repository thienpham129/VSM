package com.project.vsm.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.vsm.dto.DriverFindScheduleByDateDTO;
import com.project.vsm.dto.DriverUpdateParkingDTO;
import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
import com.project.vsm.dto.ScheduleUpdateDTO;
import com.project.vsm.dto.SearchScheduleDriverDTO;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.service.ScheduleService;

import jakarta.validation.Valid;

@RestController
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	@GetMapping("public/schedules")
	public ResponseEntity<Iterable<ScheduleEntity>> getAllSchedules() {
		return new ResponseEntity<>(scheduleService.getAllSchedules(), HttpStatus.OK);
	}

	@GetMapping("driver/schedules/{id}")
	public ResponseEntity<Iterable<ScheduleEntity>> getAllSchedulesByDriverId(@PathVariable long id) {
		return new ResponseEntity<>(scheduleService.getAllSchedulesByDriverID(id), HttpStatus.OK);
	}

	@GetMapping("public/schedule/{id}")
	public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable long id) {
		Optional<ScheduleEntity> schedule = scheduleService.getScheduleById(id);
		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
	}

	@PostMapping("driver/find-driver-schedule")
	public ResponseEntity<ScheduleEntity> getSchedulesByDriver(@RequestBody SearchScheduleDriverDTO input) {
		Optional<ScheduleEntity> schedule = scheduleService.getSchedulesByDriver(input);
		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
	}

	@PostMapping("driver/driver-schedule")
	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverID(
			@RequestBody DriverFindScheduleByDateDTO input) {
		return new ResponseEntity<>(scheduleService.getSchedulesByDriver(input), HttpStatus.OK);
	}

	@PostMapping("public/find-schedule")
	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverAndCar(@RequestBody ScheduleFindDTO input) {
		return new ResponseEntity<>(scheduleService.getSchedulesByDriverOrCarForDate(input), HttpStatus.OK);
	}

	@PostMapping("admin/schedule")
	public ResponseEntity<ScheduleEntity> createSchedule(@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
		ScheduleEntity schedule = scheduleService.createNewSchedule(scheduleDTO);
		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
	}

	@GetMapping("/public/schedule/search")
	public ResponseEntity<List<ScheduleResponse>> getSchedulesWithCars(@RequestParam String startLocation,
			@RequestParam String stopLocation,
			@RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate startTime) {
		return new ResponseEntity<>(scheduleService.getSchedulesWithCars(startLocation, stopLocation, startTime),
				HttpStatus.OK);
	}

	@PutMapping("admin/schedule")
	public ResponseEntity<ScheduleEntity> updateSchedule(@Valid @RequestBody ScheduleUpdateDTO scheduleDTO) {
		ScheduleEntity schedule = scheduleService.updateScheduleById(scheduleDTO);
		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
	}

	@GetMapping("driver/find-schedule/{id}")
	public ResponseEntity<ScheduleEntity> getCurentScheduleByDriverID(@PathVariable long id) {
		Optional<ScheduleEntity> schedule = scheduleService.getCurrentOrNextRunningSchedule(id);
		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
	}

	@PostMapping("driver/update-parking")
	public ResponseEntity<CarEntity> updateParking(@Valid @RequestBody DriverUpdateParkingDTO input) {
		CarEntity car = scheduleService.driverUpdateParking(input);
		return new ResponseEntity<>(car, HttpStatus.CREATED);
	}
}