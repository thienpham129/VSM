package com.project.vsm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.ScheduleCreateDTO;
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

	public ScheduleEntity createNewSchedule(ScheduleCreateDTO scheduleInput) {
	    // Kiểm tra sự tồn tại của Car
	    CarEntity car = carRepository.findById(scheduleInput.getCarId())
	            .orElseThrow(() -> new NotFoundException("Car with id " + scheduleInput.getCarId() + " not found"));

	    // Kiểm tra sự tồn tại của Driver (tài xế)
	    AccountEntity driver = accountRepository.findById(scheduleInput.getAccountId())
	            .filter(acc -> acc.getRole().equalsIgnoreCase("ROLE_DRIVER"))
	            .orElseThrow(() -> new NotFoundException("Driver with id " + scheduleInput.getAccountId() + " not found"));

	    // Kiểm tra sự tồn tại của Route
	    RouteEntity route = routeRepository.findById(scheduleInput.getRouteId())
	            .orElseThrow(() -> new NotFoundException("Route with id " + scheduleInput.getRouteId() + " not found"));

	    // Kiểm tra nếu tài xế có lịch trình trong ngày input
	    List<ScheduleEntity> checkScheduleDriver = scheduleRepository.findSchedulesByDriverOrCarForDate(
	            driver.getId(), car.getCarId(), scheduleInput.getStartTime().toLocalDate());

	    for (ScheduleEntity existingSchedule : checkScheduleDriver) {
	        long diffInMinutes = java.time.Duration.between(existingSchedule.getStartTime(), scheduleInput.getStartTime()).toMinutes();
	        if (Math.abs(diffInMinutes) < 180) {  // Nếu khoảng cách giữa các chuyến đi nhỏ hơn 3 giờ
	            throw new InvalidInputException("Driver's schedules must be at least 3 hours apart.");
	        }

	        // Kiểm tra với lịch trình trước của tài xế, nếu có stopTime
	        if (existingSchedule.getEndTime() != null) {
	            String previousStopLocation = existingSchedule.getRoute().getStopLocation();
	            if (!previousStopLocation.equals(route.getStartLocation())) {
	                throw new InvalidInputException("Driver's previous schedule's stopLocation must match the new schedule's startLocation.");
	            }
	        }
	    }

	    // Kiểm tra nếu xe có lịch trình trong ngày input
	    List<ScheduleEntity> checkScheduleCar = scheduleRepository.findSchedulesByDriverOrCarForDate(
	            driver.getId(), car.getCarId(), scheduleInput.getStartTime().toLocalDate());

	    for (ScheduleEntity existingSchedule : checkScheduleCar) {
	        long diffInMinutes = java.time.Duration.between(existingSchedule.getStartTime(), scheduleInput.getStartTime()).toMinutes();
	        if (Math.abs(diffInMinutes) < 180) {  // Nếu khoảng cách giữa các chuyến đi nhỏ hơn 3 giờ
	            throw new InvalidInputException("Car's schedules must be at least 3 hours apart.");
	        }

	        // Kiểm tra với lịch trình trước của xe, nếu có stopTime
	        if (existingSchedule.getEndTime() != null) {
	            String previousStopLocation = existingSchedule.getRoute().getStopLocation();
	            if (!previousStopLocation.equals(route.getStartLocation())) {
	                throw new InvalidInputException("Car's previous schedule's stopLocation must match the new schedule's startLocation.");
	            }
	        }
	    }

	    // Tạo mới ScheduleEntity
	    ScheduleEntity schedule = new ScheduleEntity();
	    schedule.setStartTime(scheduleInput.getStartTime());
	    schedule.setRoute(route);
	    schedule.setAccount(driver);
	    schedule.setCar(car);
	    schedule.setStatus("Scheduled");

	    return scheduleRepository.save(schedule);
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

//	public ScheduleEntity updateScheduleById(long id, ScheduleCreateDTO scheduleInput) {
//		Optional<ScheduleEntity> optionalEntity = scheduleRepository.findById(id);
//		if (!optionalEntity.isPresent()) {
//			throw new NotFoundException("Not found schedule with id " + id);
//		}
//		Optional<CarEntity> car = carRepository.findById(scheduleInput.getCarId());
//		if (!car.isPresent()) {
//			throw new NotFoundException("Not found car with id " + scheduleInput.getCarId());
//		}
//		Optional<AccountEntity> driver = accountRepository.findById(scheduleInput.getAccountId());
//		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
//			throw new NotFoundException("Not found driver with id " + scheduleInput.getAccountId());
//		}
//		List<ScheduleEntity> checkScheduleCar = scheduleRepository.findByCarAndStartTime(car.get(),
//				scheduleInput.getStartTime());
//		if (checkScheduleCar.size() > 0) {
//			throw new InvalidInputException("Đã tồn tại schedule với giờ và xe này");
//		}
//		List<ScheduleEntity> checkScheduleDriver = scheduleRepository.findByAccountAndStartTime(driver.get(),
//				scheduleInput.getStartTime());
//		if (checkScheduleDriver.size() > 0) {
//			throw new InvalidInputException("Đã tồn tại schedule với giờ và tài xế này");
//		}
//		optionalEntity.get().setAccount(driver.get());
//		optionalEntity.get().setCar(car.get());
//		optionalEntity.get().setStartTime(scheduleInput.getStartTime());
//		return scheduleRepository.save(optionalEntity.get());
//	}

//	public List<ScheduleEntity> getSchedulesByDriverOrCarForDate(ScheduleFindDTO scheduleFindDTO) {
//		LocalDate startDate = scheduleFindDTO.getStartDate(); // Ngày từ input
//
//		Long carId = scheduleFindDTO.getCarId(); // ID của xe
//		Long driverId = scheduleFindDTO.getAccountId(); // ID của tài xế
//
//		// Kiểm tra sự tồn tại của xe và tài xế
//		Optional<CarEntity> car = carRepository.findById(carId);
//		if (!car.isPresent()) {
//			throw new NotFoundException("Not found car with id " + carId);
//		}
//		Optional<AccountEntity> driver = accountRepository.findById(driverId);
//		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
//			throw new NotFoundException("Not found driver with id " + driverId);
//		}
//
//		// Tìm các lịch trình liên quan đến tài xế hoặc xe trong ngày
//		List<ScheduleEntity> schedules = scheduleRepository.findSchedulesByDriverOrCarForDate(driverId, carId,
//				startDate);
//
//		if (schedules.isEmpty()) {
//			throw new NotFoundException(
//					"No schedules found for driverId " + driverId + " or carId " + carId + " on date " + startDate);
//		}
//
//		return schedules;
//	}
}
