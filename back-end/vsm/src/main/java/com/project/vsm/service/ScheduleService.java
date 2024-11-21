package com.project.vsm.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.RouteRepository;
import com.project.vsm.repository.ScheduleRepository;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	private CarRepository carRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private RouteRepository routeRepository;

	public ScheduleEntity createNewSchedule(ScheduleCreateDTO scheduleDTO) {
		// Kiểm tra xe có tồn tại không
		Optional<CarEntity> optionalCar = carRepository.findById(scheduleDTO.getCarId());
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + scheduleDTO.getCarId());
		}

		// Kiểm tra tài xế có tồn tại và có phải là tài xế không
		Optional<AccountEntity> optionalDriver = accountRepository.findById(scheduleDTO.getAccountId());
		if (!optionalDriver.isPresent() || !optionalDriver.get().getRole().equals("ROLE_DRIVER")) {
			throw new NotFoundException("Not found Driver with id " + scheduleDTO.getAccountId());
		}

		// Kiểm tra tuyến đường có tồn tại không
		Optional<RouteEntity> optionalRoute = routeRepository.findById(scheduleDTO.getRouteId());
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found Route with id " + scheduleDTO.getRouteId());
		}

		// Kiểm tra tính khả dụng của tài xế và xe
		if (!isAccountAvailable(scheduleDTO.getAccountId(), scheduleDTO.getStartTime())
				|| !isCarAvailable(scheduleDTO.getCarId(), scheduleDTO.getStartTime())) {
			throw new InvalidInputException("Tài xế hoặc xe sắp lịch phải cách nhau ít nhất 3 tiếng");
		}

		String carStopLocation = findClosestStopLocation(scheduleDTO.getCarId(), scheduleDTO.getStartTime());
		String driverStopLocation = findClosestStopLocationByDriver(scheduleDTO.getAccountId(),
				scheduleDTO.getStartTime());

		// Kiểm tra nếu không có lịch trình trước đó, bỏ qua kiểm tra điểm bắt đầu
		if (carStopLocation != null && !carStopLocation.equals(optionalRoute.get().getStartLocation())) {
			throw new InvalidInputException(
					"Điểm bắt đầu của lịch phải phù hợp với điểm dừng của lịch trước đó cho xe.");
		}
		if (driverStopLocation != null && !driverStopLocation.equals(optionalRoute.get().getStartLocation())) {
			throw new InvalidInputException(
					"Điểm bắt đầu của lịch phải phù hợp với điểm dừng của lịch trước đó cho tài xế.");
		}

		// Tạo đối tượng ScheduleEntity mới
		ScheduleEntity schedule = new ScheduleEntity();
		schedule.setAccount(optionalDriver.get());
		schedule.setCar(optionalCar.get());
		schedule.setRoute(optionalRoute.get());
		schedule.setStartTime(scheduleDTO.getStartTime());
		schedule.setStatus("Đã lên lịch");

		// Lưu lịch trình vào cơ sở dữ liệu và trả về
		return scheduleRepository.save(schedule);
	}

	public String findClosestStopLocationByDriver(Long driverId, LocalDateTime startTime) {
		List<ScheduleEntity> schedules = scheduleRepository.findClosestScheduleSameDayByDriver(driverId, startTime);

		if (!schedules.isEmpty()) {
			ScheduleEntity closestSchedule = schedules.get(0);
			return closestSchedule.getRoute().getStopLocation();
		}
		return null;
	}

	public String findClosestStopLocation(Long carId, LocalDateTime startTime) {
		List<ScheduleEntity> schedules = scheduleRepository.findClosestScheduleSameDay(carId, startTime);

		if (!schedules.isEmpty()) {
			ScheduleEntity closestSchedule = schedules.get(0);
			return closestSchedule.getRoute().getStopLocation();
		}
		return null;
	}

	public boolean isCarAvailable(Long carId, LocalDateTime startTime) {
		List<ScheduleEntity> conflictingSchedules = scheduleRepository.findConflictingSchedules(carId, startTime);
		return conflictingSchedules.isEmpty();
	}

	public boolean isAccountAvailable(Long accountId, LocalDateTime startTime) {
		List<ScheduleEntity> conflictingSchedules = scheduleRepository.findConflictingSchedulesByAccount(accountId,
				startTime);
		return conflictingSchedules.isEmpty();
	}

	public Optional<ScheduleEntity> getScheduleById(long id) {
		Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findById(id);
		if (!optionalSchedule.isPresent()) {
			throw new NotFoundException("Not found schedule with id " + id);
		}
		return optionalSchedule;
	}

	public Iterable<ScheduleEntity> getAllSchedules() {
		Iterable<ScheduleEntity> listSchedules = scheduleRepository.findAll();
		return listSchedules;
	}

	public List<ScheduleEntity> getSchedulesByDriverOrCarForDate(ScheduleFindDTO scheduleFindDTO) {
		LocalDate startDate = scheduleFindDTO.getStartDate(); // Ngày từ input

		Long carId = scheduleFindDTO.getCarId(); // ID của xe
		Long driverId = scheduleFindDTO.getAccountId(); // ID của tài xế
		Optional<CarEntity> car = carRepository.findById(carId);
		if (!car.isPresent()) {
			throw new NotFoundException("Not found car with id " + carId);
		}
		Optional<AccountEntity> driver = accountRepository.findById(driverId);
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + driverId);
		}

		// Tìm các lịch trình liên quan đến tài xế hoặc xe trong ngày
		List<ScheduleEntity> schedules = scheduleRepository.findSchedulesByDriverOrCarForDate(driverId, carId,
				startDate);

		if (schedules.isEmpty()) {
			throw new NotFoundException(
					"No schedules found for driverId " + driverId + " or carId " + carId + " on date " + startDate);
		}

		return schedules;
	}
}