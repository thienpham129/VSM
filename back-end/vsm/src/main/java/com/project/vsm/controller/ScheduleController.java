package com.project.vsm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleUpdateDTO;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.service.ScheduleService;

import jakarta.validation.Valid;

@RestController
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	@PostMapping("/public/create-or-find")
	public ResponseEntity<ScheduleResponse> createOrFindSchedule(
			@RequestBody @Valid ScheduleCreateDTO scheduleCreateDTO) {
		ScheduleResponse schedule = scheduleService.createOrFindSchedule(scheduleCreateDTO);
		return ResponseEntity.ok(schedule);
	}

	@GetMapping("/public/schedule")
	public ResponseEntity<List<ScheduleResponse>> getAllSchedules() {
		List<ScheduleResponse> schedules = scheduleService.getAllSchedules();
		return ResponseEntity.ok(schedules);
	}

	@GetMapping("/public/empty-schedule")
	public ResponseEntity<List<ScheduleResponse>> getAllEmptySchedules() {
		List<ScheduleResponse> schedules = scheduleService.getEmptySchedules();
		return ResponseEntity.ok(schedules);
	}

	@GetMapping("/driver/driver-schedule")
	public ResponseEntity<List<ScheduleResponse>> getAllDriverSchedules(@RequestParam long accountId) {
		List<ScheduleResponse> schedules = scheduleService.getScheduleByAccountId(accountId);
		return ResponseEntity.ok(schedules);
	}

	@GetMapping("/public/schedule/{id}")
	public ResponseEntity<ScheduleResponse> getScheduleById(@PathVariable Long id) {
		ScheduleResponse schedule = scheduleService.getScheduleById(id);
		return ResponseEntity.ok(schedule);
	}

	@DeleteMapping("/admin/schedule/{id}")
	public ResponseEntity<String> deleteScheduleById(@PathVariable Long id) {
		scheduleService.deleteScheduleById(id);
		return ResponseEntity.ok("Lịch trình đã được xóa");
	}

	@PutMapping("driver/update-schedule-account")
	public ResponseEntity<ScheduleResponse> updateScheduleAccount(@RequestParam long scheduleId,
			@RequestParam long accountId) {
		ScheduleResponse updatedSchedule = scheduleService.updateScheduleAccount(scheduleId, accountId);
		return ResponseEntity.ok(updatedSchedule);
	}

	@PutMapping("driver/update-remove-schedule")
	public ResponseEntity<ScheduleResponse> deleteDriverSchedule(@RequestParam long scheduleId) {
		ScheduleResponse updatedSchedule = scheduleService.removeAccountFromSchedule(scheduleId);
		return ResponseEntity.ok(updatedSchedule);
	}

	@PutMapping("driver/update-status-schedule")
	public ResponseEntity<ScheduleResponse> updateStatusSchedule(@RequestParam long scheduleId,
			@RequestParam String status) {
		ScheduleResponse updatedSchedule = scheduleService.updateStatus(scheduleId, status);
		return ResponseEntity.ok(updatedSchedule);
	}

	// Update schedule by ID
	@PutMapping("/admin/schedule/{id}")
	public ResponseEntity<ScheduleResponse> updateSchedule(@PathVariable Long id,
			@RequestBody ScheduleUpdateDTO scheduleUpdateDTO) {
		ScheduleResponse updatedSchedule = scheduleService.updateSchedule(id, scheduleUpdateDTO);
		return ResponseEntity.ok(updatedSchedule);
	}
//	@GetMapping("public/schedules")
//	public ResponseEntity<Iterable<ScheduleEntity>> getAllSchedules() {
//		return new ResponseEntity<>(scheduleService.getAllSchedules(), HttpStatus.OK);
//	}
//
//	@GetMapping("driver/schedules/{id}")
//	public ResponseEntity<Iterable<ScheduleEntity>> getAllSchedulesByDriverId(@PathVariable long id) {
//		return new ResponseEntity<>(scheduleService.getAllSchedulesByDriverID(id), HttpStatus.OK);
//	}
//
//	@GetMapping("public/schedule/{id}")
//	public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable long id) {
//		Optional<ScheduleEntity> schedule = scheduleService.getScheduleById(id);
//		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
//	}
//
//	@PostMapping("driver/find-driver-schedule")
//	public ResponseEntity<ScheduleEntity> getSchedulesByDriver(@RequestBody SearchScheduleDriverDTO input) {
//		Optional<ScheduleEntity> schedule = scheduleService.getSchedulesByDriver(input);
//		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
//	}
//
//	@PostMapping("driver/driver-schedule")
//	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverID(
//			@RequestBody DriverFindScheduleByDateDTO input) {
//		return new ResponseEntity<>(scheduleService.getSchedulesByDriver(input), HttpStatus.OK);
//	}
//
//	@PostMapping("public/find-schedule")
//	public ResponseEntity<Iterable<ScheduleEntity>> getSchedulesByDriverAndCar(@RequestBody ScheduleFindDTO input) {
//		return new ResponseEntity<>(scheduleService.getSchedulesByDriverOrCarForDate(input), HttpStatus.OK);
//	}
//
//	@PostMapping("admin/schedule")
//	public ResponseEntity<ScheduleEntity> createSchedule(@Valid @RequestBody ScheduleCreateDTO scheduleDTO) {
//		ScheduleEntity schedule = scheduleService.createNewSchedule(scheduleDTO);
//		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
//	}
//
//	@GetMapping("/public/schedule/search")
//	public ResponseEntity<List<ScheduleResponse>> getSchedulesWithCars(@RequestParam String startLocation,
//			@RequestParam String stopLocation,
//			@RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate startTime) {
//		return new ResponseEntity<>(scheduleService.getSchedulesWithCars(startLocation, stopLocation, startTime),
//				HttpStatus.OK);
//	}
//
//	@PutMapping("admin/schedule")
//	public ResponseEntity<ScheduleEntity> updateSchedule(@Valid @RequestBody ScheduleUpdateDTO scheduleDTO) {
//		ScheduleEntity schedule = scheduleService.updateScheduleById(scheduleDTO);
//		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
//	}
//
//	@GetMapping("driver/find-schedule/{id}")
//	public ResponseEntity<ScheduleEntity> getCurentScheduleByDriverID(@PathVariable long id) {
//		Optional<ScheduleEntity> schedule = scheduleService.getCurrentOrNextRunningSchedule(id);
//		return new ResponseEntity<>(schedule.get(), HttpStatus.OK);
//	}
//
//	@PostMapping("driver/update-parking")
//	public ResponseEntity<CarEntity> updateParking(@Valid @RequestBody DriverUpdateParkingDTO input) {
//		CarEntity car = scheduleService.driverUpdateParking(input);
//		return new ResponseEntity<>(car, HttpStatus.CREATED);
//	}
//
//	@PutMapping("driver/update-status-schedule")
//	public ResponseEntity<ScheduleEntity> updateStatusSchedule(
//			@Valid @RequestBody DriverUpdateScheduleDTO scheduleDTO) {
//		ScheduleEntity schedule = scheduleService.driverUpdateScheduleById(scheduleDTO);
//		return new ResponseEntity<>(schedule, HttpStatus.CREATED);
//	}
}