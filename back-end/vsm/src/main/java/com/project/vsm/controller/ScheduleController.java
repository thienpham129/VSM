package com.project.vsm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
import com.project.vsm.dto.SearchScheduleDriverDTO;
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

	@PostMapping("public/find-schedule")
	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverAndCar(@RequestBody ScheduleFindDTO input) {
		return new ResponseEntity<>(scheduleService.getSchedulesByDriverOrCarForDate(input), HttpStatus.OK);
	}

	@PostMapping("admin/schedule")
	public ResponseEntity<ScheduleEntity> createSchedule(@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
		ScheduleEntity schedule = scheduleService.createNewSchedule(scheduleDTO);
		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
	}

//	@PostMapping("public/find-schedule")
//	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverAndCar(@RequestBody ScheduleFindDTO input) {
//		return new ResponseEntity<>(scheduleService.getSchedulesByDriverOrCarForDate(input),
//				HttpStatus.OK);
//	}
//	
//	@PutMapping("/admin/schedule/{id}")
//	public ResponseEntity<ScheduleEntity> updateScheduleById(@PathVariable long id,
//			@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
//		return new ResponseEntity<>(scheduleService.updateScheduleById(id, scheduleDTO), HttpStatus.OK);
//	}
}