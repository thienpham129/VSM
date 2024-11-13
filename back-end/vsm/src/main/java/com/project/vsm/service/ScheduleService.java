package com.project.vsm.service;

import java.time.LocalDate;
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
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.ScheduleRepository;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	private CarRepository carRepository;
	@Autowired
	private AccountRepository accountRepository;

	public ScheduleEntity createNewSchedule(ScheduleCreateDTO scheduleInput) {
		Optional<CarEntity> car = carRepository.findById(scheduleInput.getCarId());
		if (!car.isPresent()) {
			throw new NotFoundException("Not found car with id " + scheduleInput.getCarId());
		}
		Optional<AccountEntity> driver = accountRepository.findById(scheduleInput.getAccountId());
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + scheduleInput.getAccountId());
		}
		List<ScheduleEntity> checkScheduleCar = scheduleRepository.findByCarAndStartTime(car.get(),
				scheduleInput.getStartTime());
		if (checkScheduleCar.size() > 0) {
			throw new InvalidInputException("Đã tồn tại schedule với giờ và xe này");
		}
		List<ScheduleEntity> checkScheduleDriver = scheduleRepository.findByAccountAndStartTime(driver.get(),
				scheduleInput.getStartTime());
		if (checkScheduleDriver.size() > 0) {
			throw new InvalidInputException("Đã tồn tại schedule với giờ và tài xế này");
		}
		ScheduleEntity schedule = new ScheduleEntity();
		schedule.setStartTime(scheduleInput.getStartTime());
		schedule.setAccount(driver.get());
		schedule.setCar(car.get());
		schedule.setStatus("Đã lên lịch");
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

	public ScheduleEntity updateScheduleById(long id, ScheduleCreateDTO scheduleInput) {
		Optional<ScheduleEntity> optionalEntity = scheduleRepository.findById(id);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found schedule with id " + id);
		}
		Optional<CarEntity> car = carRepository.findById(scheduleInput.getCarId());
		if (!car.isPresent()) {
			throw new NotFoundException("Not found car with id " + scheduleInput.getCarId());
		}
		Optional<AccountEntity> driver = accountRepository.findById(scheduleInput.getAccountId());
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + scheduleInput.getAccountId());
		}
		List<ScheduleEntity> checkScheduleCar = scheduleRepository.findByCarAndStartTime(car.get(),
				scheduleInput.getStartTime());
		if (checkScheduleCar.size() > 0) {
			throw new InvalidInputException("Đã tồn tại schedule với giờ và xe này");
		}
		List<ScheduleEntity> checkScheduleDriver = scheduleRepository.findByAccountAndStartTime(driver.get(),
				scheduleInput.getStartTime());
		if (checkScheduleDriver.size() > 0) {
			throw new InvalidInputException("Đã tồn tại schedule với giờ và tài xế này");
		}
		optionalEntity.get().setAccount(driver.get());
		optionalEntity.get().setCar(car.get());
		optionalEntity.get().setStartTime(scheduleInput.getStartTime());
		return scheduleRepository.save(optionalEntity.get());
	}

	public List<ScheduleEntity> getSchedulesByDriverOrCarForDate(ScheduleFindDTO scheduleFindDTO) {
		LocalDate startDate = scheduleFindDTO.getStartDate(); // Ngày từ input

		Long carId = scheduleFindDTO.getCarId(); // ID của xe
		Long driverId = scheduleFindDTO.getAccountId(); // ID của tài xế

		// Kiểm tra sự tồn tại của xe và tài xế
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
