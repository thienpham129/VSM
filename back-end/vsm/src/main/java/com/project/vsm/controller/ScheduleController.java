package com.project.vsm.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
import com.project.vsm.dto.request.PagingRequest;
import com.project.vsm.dto.response.PageableResponse;
import com.project.vsm.dto.response.PagingResponse;
import com.project.vsm.dto.response.ScheduleResponse;
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

	@GetMapping("public/schedule/{id}")
	public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable long id) {
		Optional<ScheduleEntity> schedule = scheduleService.getScheduleById(id);
		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
	}

	@PostMapping("public/find-schedule")
	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverAndCar(@RequestBody ScheduleFindDTO input) {
		return new ResponseEntity<>(scheduleService.getSchedulesByDriverOrCarForDate(input),
				HttpStatus.OK);
	}

	@PostMapping("admin/schedule")
	public ResponseEntity<ScheduleEntity> createSchedule(@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
		ScheduleEntity schedule = scheduleService.createNewSchedule(scheduleDTO);
		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
	}

	@PutMapping("/admin/schedule/{id}")
	public ResponseEntity<ScheduleEntity> updateScheduleById(@PathVariable long id,
			@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
		return new ResponseEntity<>(scheduleService.updateScheduleById(id, scheduleDTO), HttpStatus.OK);
	}
	
	@GetMapping("/public/schedule/search")
    public ResponseEntity<List<ScheduleResponse>> getSchedules(
            @RequestParam(required = true) String startLocation,
            @RequestParam(required = true) String stopLocation,
            @RequestParam(required = true) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime) {

        return new ResponseEntity<>(scheduleService.getSchedulesWithCars(startLocation, stopLocation, startTime) , HttpStatus.OK) ;
    }
}
