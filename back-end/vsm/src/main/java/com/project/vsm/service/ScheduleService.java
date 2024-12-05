package com.project.vsm.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.DriverFindScheduleByDateDTO;
import com.project.vsm.dto.DriverUpdateParkingDTO;
import com.project.vsm.dto.DriverUpdateScheduleDTO;
import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleFindDTO;
import com.project.vsm.dto.ScheduleUpdateDTO;
import com.project.vsm.dto.SearchScheduleDriverDTO;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.ParkingEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.ParkingRepository;
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
	@Autowired
	private ParkingRepository parkingRepository;

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

//		String carStopLocation = findClosestStopLocation(scheduleDTO.getCarId(), scheduleDTO.getStartTime());
//		String driverStopLocation = findClosestStopLocationByDriver(scheduleDTO.getAccountId(),
//				scheduleDTO.getStartTime());

		// Kiểm tra nếu không có lịch trình trước đó, bỏ qua kiểm tra điểm bắt đầu
//		if (carStopLocation != null && !carStopLocation.equals(optionalRoute.get().getStartLocation())) {
//			throw new InvalidInputException(
//					"Điểm bắt đầu của lịch phải phù hợp với điểm dừng của lịch trước đó cho xe.");
//		}
//		if (driverStopLocation != null && !driverStopLocation.equals(optionalRoute.get().getStartLocation())) {
//			throw new InvalidInputException(
//					"Điểm bắt đầu của lịch phải phù hợp với điểm dừng của lịch trước đó cho tài xế.");
//		}

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

	public ScheduleEntity updateScheduleById(ScheduleUpdateDTO scheduleUpdateDTO) {

		Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findById(scheduleUpdateDTO.getSchduleId());
		if (!optionalSchedule.isPresent()) {
			throw new NotFoundException("Not found schedule with id " + scheduleUpdateDTO.getSchduleId());
		}
		// Kiểm tra xe có tồn tại không
		Optional<CarEntity> optionalCar = carRepository.findById(scheduleUpdateDTO.getCarId());
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + scheduleUpdateDTO.getCarId());
		}

		// Kiểm tra tài xế có tồn tại và có phải là tài xế không
		Optional<AccountEntity> optionalDriver = accountRepository.findById(scheduleUpdateDTO.getAccountId());
		if (!optionalDriver.isPresent() || !optionalDriver.get().getRole().equals("ROLE_DRIVER")) {
			throw new NotFoundException("Not found Driver with id " + scheduleUpdateDTO.getAccountId());
		}

		// Kiểm tra tuyến đường có tồn tại không
		Optional<RouteEntity> optionalRoute = routeRepository.findById(scheduleUpdateDTO.getRouteId());
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found Route with id " + scheduleUpdateDTO.getRouteId());
		}

//		// Kiểm tra tính khả dụng của tài xế và xe
//		if ((!isAccountAvailable(scheduleUpdateDTO.getAccountId(), scheduleUpdateDTO.getStartTime())
//				|| !isCarAvailable(scheduleUpdateDTO.getCarId(), scheduleUpdateDTO.getStartTime()))
//				|| (optionalSchedule.get().getStartTime() == scheduleUpdateDTO.getStartTime())) {
//			throw new InvalidInputException("Tài xế hoặc xe sắp lịch phải cách nhau ít nhất 3 tiếng");
//		}

		String carStopLocation = findClosestStopLocation(scheduleUpdateDTO.getCarId(),
				scheduleUpdateDTO.getStartTime());
		String driverStopLocation = findClosestStopLocationByDriver(scheduleUpdateDTO.getAccountId(),
				scheduleUpdateDTO.getStartTime());

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
		optionalSchedule.get().setAccount(optionalDriver.get());
		optionalSchedule.get().setCar(optionalCar.get());
		optionalSchedule.get().setRoute(optionalRoute.get());
		optionalSchedule.get().setStartTime(scheduleUpdateDTO.getStartTime());
		optionalSchedule.get().setStatus(scheduleUpdateDTO.getStatus());
		optionalSchedule.get().setEndTime(scheduleUpdateDTO.getEndTime());

		// Lưu lịch trình vào cơ sở dữ liệu và trả về
		return scheduleRepository.save(optionalSchedule.get());
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

	public Iterable<ScheduleEntity> getAllSchedulesByDriverID(Long driverId) {
		Optional<AccountEntity> driver = accountRepository.findById(driverId);
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + driverId);
		}

		Iterable<ScheduleEntity> listSchedules = scheduleRepository.findByAccount_Id(driverId);
		return listSchedules;
	}

	public Optional<ScheduleEntity> getSchedulesByDriver(SearchScheduleDriverDTO scheduleFindDTO) {
		LocalDateTime dateTime = scheduleFindDTO.getDateTime(); // Ngày từ input

		Long driverId = scheduleFindDTO.getAccountId(); // ID của tài xế
		Optional<AccountEntity> driver = accountRepository.findById(driverId);
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + driverId);
		}

		// Tìm các lịch trình liên quan đến tài xế hoặc xe trong ngày
		Optional<ScheduleEntity> schedules = scheduleRepository.findByAccount_IdAndStartTime(driverId, dateTime);
		if (schedules.isEmpty()) {
			throw new NotFoundException("No schedules found for driverId " + driverId + " on date " + dateTime);
		}

		return schedules;
	}

	public Iterable<ScheduleEntity> getSchedulesByDriver(DriverFindScheduleByDateDTO scheduleFindDTO) {
		LocalDate date = scheduleFindDTO.getDay(); // Ngày từ input

		Long driverId = scheduleFindDTO.getAccountId(); // ID của tài xế
		Optional<AccountEntity> driver = accountRepository.findById(driverId);
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + driverId);
		}

		// Tìm các lịch trình liên quan đến tài xế hoặc xe trong ngày
		Iterable<ScheduleEntity> schedules = scheduleRepository.findSchedulesByDayAndAccountId(date, driverId);

		return schedules;
	}

	public List<ScheduleResponse> getSchedulesWithCars(String startLocation, String stopLocation, LocalDate startTime) {
//		System.out.println("startLocation: " + startLocation);
//		System.out.println("stopLocation: " + stopLocation);
//		System.out.println("startTime: " + startTime);
//		List<ScheduleEntity> schedules = scheduleRepository.findStartLocationStopLocationStartTime(startLocation,
//				stopLocation, startTime);
//		if (schedules.isEmpty()) {
//			System.out.println("No schedules found.");
//			return Collections.emptyList();
//		}
//		List<ScheduleResponse> responses = new ArrayList<>();
//		for (ScheduleEntity schedule : schedules) {
//			ScheduleResponse response = ScheduleResponse.mapScheduleResponse(schedule , c);
//			CarEntity car = schedule.getCar();
//			if (car != null) {
//				CarResponse carResponse = CarResponse.mapCarResponse(car);
//				response.setCar(carResponse);
//			}
//			responses.add(response);
//		}
//		return responses;
		return null;
	}

	public Optional<ScheduleEntity> getCurrentOrNextRunningSchedule(Long accountId) {
		LocalDateTime currentTime = LocalDateTime.now();
		LocalDateTime startOfDay = currentTime.toLocalDate().atStartOfDay(); // 00:00 hôm nay
		LocalDateTime endOfDay = startOfDay.plusDays(1); // 00:00 ngày mai
		Optional<AccountEntity> driver = accountRepository.findById(accountId);
		if (!driver.isPresent() || !driver.get().getRole().equalsIgnoreCase("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + accountId);
		}
		List<ScheduleEntity> schedules = scheduleRepository.findCurrentOrNextRunningSchedules(accountId, currentTime);
		schedules = schedules.stream().filter(
				schedule -> !schedule.getStartTime().isBefore(startOfDay) && schedule.getStartTime().isBefore(endOfDay))
				.collect(Collectors.toList());
		if (schedules.isEmpty()) {
			throw new NotFoundException("Không tìm thấy schedule trong ngày hôm nay");
		}
		return Optional.of(schedules.get(0));
	}

	public CarEntity driverUpdateParking(DriverUpdateParkingDTO input) {
		Optional<ScheduleEntity> optionalSchedule = getCurrentOrNextRunningSchedule(input.getAccountId());
		if (optionalSchedule.isEmpty()) {
			throw new NotFoundException("Không tìm thấy schedule trong ngày hôm nay");
		}
		Optional<CarEntity> optionalCar = carRepository.findById(optionalSchedule.get().getCar().getCarId());
		if (optionalCar.isEmpty()) {
			throw new NotFoundException("Không tìm thấy car id = " + optionalSchedule.get().getCar().getCarId());
		}
		Optional<ParkingEntity> optionalParking = parkingRepository.findById(input.getParkingId());
		if (optionalParking.isEmpty()) {
			throw new NotFoundException("Không tìm thấy parking id = " + input.getParkingId());
		}
//		update số lượng xe bãi cũ
		if (optionalCar.get().getParking() != null) {
			Optional<ParkingEntity> oldParking = parkingRepository.findById(optionalCar.get().getParking().getId());
			oldParking.get().setNumCar(oldParking.get().getNumCar() - 1);
			parkingRepository.save(optionalParking.get());
		}
//		update số lượng xẽ bãi đỗ mới
		optionalParking.get().setNumCar(optionalParking.get().getNumCar() + 1);
		parkingRepository.save(optionalParking.get());
//		
		optionalCar.get().setParking(optionalParking.get());
		return carRepository.save(optionalCar.get());
	}

	public ScheduleEntity driverUpdateScheduleById(DriverUpdateScheduleDTO scheduleUpdateDTO) {

		Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findById(scheduleUpdateDTO.getSchduleId());
		if (!optionalSchedule.isPresent()) {
			throw new NotFoundException("Not found schedule with id " + scheduleUpdateDTO.getSchduleId());
		}
		optionalSchedule.get().setStatus(scheduleUpdateDTO.getStatus());
		// Lưu lịch trình vào cơ sở dữ liệu và trả về
		return scheduleRepository.save(optionalSchedule.get());
	}
}