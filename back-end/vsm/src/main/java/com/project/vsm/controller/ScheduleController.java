package com.project.vsm.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.project.vsm.dto.response.ScheduleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
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

    @GetMapping("/public/schedule/search")
    public ResponseEntity<List<ScheduleResponse>> getSchedulesWithCars(@RequestParam String startLocation,
                                                                       @RequestParam String stopLocation,
                                                                       @RequestParam LocalDate startTime) {
        return new ResponseEntity<>(scheduleService.getSchedulesWithCars(startLocation , stopLocation , startTime)
                                    , HttpStatus.OK);
    }
}