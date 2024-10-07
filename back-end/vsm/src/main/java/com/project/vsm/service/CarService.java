package com.project.vsm.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.vsm.dto.CarCreateDTO;
import com.project.vsm.dto.CarUpdateDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarImageEntity;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.CarImageRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.TypeRepository;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;
	@Autowired
	private TypeRepository typeRepository;
	@Autowired
	private CarImageRepository carImageRepository;
	@Autowired
	private FileService fileService;

	public Optional<CarEntity> getCarById(long id) {
		Optional<CarEntity> optionalCar = carRepository.findById(id);
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + id);
		}
		return optionalCar;
	}

	public CarEntity createNewCar(CarCreateDTO carDTO) throws IOException {
		// Fetch TypeEntity by id
		Optional<TypeEntity> typeEntity = typeRepository.findById(carDTO.getTypeID());

		if (!typeEntity.isPresent()) {
			throw new RuntimeException("Loại xe không tồn tại với ID: " + carDTO.getTypeID());
		}

		// Create a new CarEntity from the DTO
		CarEntity car = new CarEntity();
		car.setName(carDTO.getName());
		car.setPlateNumber(carDTO.getPlateNumber());
		car.setColor(carDTO.getColor());
		car.setManufactory(carDTO.getManufactory());
		car.setYearOfManufacture(carDTO.getYearOfManufacture());
		car.setDayMaintenance(LocalDate.now());
		car.setType(typeEntity.get());

		// Lưu CarEntity vào DB
		CarEntity savedCar = carRepository.save(car);

		// Lưu hình ảnh
		List<CarImageEntity> imageCarEntities = new ArrayList<>();
		for (MultipartFile imageFile : carDTO.getImages()) {
			String fileCode = fileService.saveFile(imageFile.getOriginalFilename(), imageFile);
			CarImageEntity imageCar = new CarImageEntity();
			imageCar.setImageUrl(fileCode);
			imageCar.setCar(savedCar); // Gán CarEntity cho hình ảnh
			imageCarEntities.add(imageCar);
		}

		// Lưu tất cả các hình ảnh vào DB
		carImageRepository.saveAll(imageCarEntities);
		return savedCar; // Trả về CarEntity đã lưu
	}

	public Iterable<CarEntity> getAllCars() {
		Iterable<CarEntity> listCars = carRepository.findAll();
		return listCars;
	}

	public CarEntity deleteCarById(long id) {
		Optional<CarEntity> optionalCar = carRepository.findById(id);
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + id);
		}
		carRepository.delete(optionalCar.get());
		return optionalCar.get();
	}

	public CarEntity updateCarById(long id, CarUpdateDTO carUpdate) throws IOException {
		Optional<CarEntity> optionalCar = carRepository.findById(id);
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + id);
		}
		Optional<TypeEntity> typeUpdate = typeRepository.findById(carUpdate.getTypeID());
		if (!typeUpdate.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dayMaintenanceUpdate = LocalDate.now();
		try {
			dayMaintenanceUpdate = LocalDate.parse(carUpdate.getDayMaintenance(), formatter);
		} catch (DateTimeParseException e) {
			throw new InvalidInputException("Invalid day maintance dd/mm/yyyy");
		}

		optionalCar.get().setCarId(id);
		optionalCar.get().setColor(carUpdate.getColor());
		optionalCar.get().setDayMaintenance(dayMaintenanceUpdate);
		optionalCar.get().setManufactory(carUpdate.getManufactory());
		optionalCar.get().setName(carUpdate.getName());
		optionalCar.get().setPlateNumber(carUpdate.getPlateNumber());
		optionalCar.get().setType(typeUpdate.get());
		optionalCar.get().setYearOfManufacture(carUpdate.getYearOfManufacture());
		return carRepository.save(optionalCar.get());
	}

	public List<CarEntity> getCarByType(long idType) {
		Optional<TypeEntity> optionalType = typeRepository.findById(idType);
		if (!optionalType.isPresent()) {
			throw new NotFoundException("Not found type with id " + idType);
		}
		List<CarEntity> listCars = carRepository.findByType_TypeId(idType);
		if (listCars.isEmpty()) {
			throw new NotFoundException("Not have car with type id " + idType);
		}
		return listCars;
	}

	
}
