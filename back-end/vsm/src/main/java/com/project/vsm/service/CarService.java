package com.project.vsm.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.vsm.dto.CarCreateDTO;
import com.project.vsm.dto.CarUpdateDTO;
import com.project.vsm.dto.request.CarSearchRequest;
import com.project.vsm.dto.response.CarResponse;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarImageEntity;
import com.project.vsm.model.ParkingEntity;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.CarImageRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.ParkingRepository;
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
	private ParkingRepository parkingRepository;
	@Autowired
	private FileService fileService;
	@Autowired
	private CarImageService carImageService;

	public Optional<CarEntity> getCarById(long id) {
		Optional<CarEntity> optionalCar = carRepository.findById(id);
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + id);
		}
		return optionalCar;
	}

	public CarEntity createNewCar(CarCreateDTO carDTO) throws IOException {
		// Fetch TypeEntity by id
		TypeEntity typeEntity = typeRepository.findById(carDTO.getTypeID())
				.orElseThrow(() -> new NotFoundException("TypeEntity not found for ID: " + carDTO.getTypeID()));

		// Create a new CarEntity from the DTO
		CarEntity car = new CarEntity();
		car.setName(carDTO.getName());
		car.setPlateNumber(carDTO.getPlateNumber());
		car.setColor(carDTO.getColor());
		car.setManufactory(carDTO.getManufactory());
		car.setYearOfManufacture(carDTO.getYearOfManufacture());
		car.setDayMaintenance(LocalDate.now());
		car.setType(typeEntity);

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

//	private void updateParking(ParkingEntity old, ParkingEntity newParking) {
//		old.setNumCar(old.getNumCar() - 1);
//		newParking.setNumCar(newParking.getNumCar() + 1);
//		if (newParking.getCapacity() == newParking.getNumCar()) {
//			newParking.setEmpty(false);
//		}
//		parkingRepository.save(newParking);
//		parkingRepository.save(old);
//	}

	public CarEntity updateCarById(long id, CarUpdateDTO carUpdate) throws IOException {
		Optional<CarEntity> optionalCar = carRepository.findById(id);
		if (!optionalCar.isPresent()) {
			throw new NotFoundException("Not found car with id " + id);
		}
		Optional<TypeEntity> typeUpdate = typeRepository.findById(carUpdate.getTypeID());
		if (!typeUpdate.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}

//		Optional<ParkingEntity> parkingUpdate = parkingRepository.findById(carUpdate.getParkingID());
		ParkingEntity parkingUpdate = null;
		if (carUpdate.getParkingID() != null) {
			parkingUpdate = parkingRepository.findById(carUpdate.getParkingID())
					.orElseThrow(() -> new NotFoundException("Not found parking with id " + carUpdate.getParkingID()));
			parkingUpdate.setNumCar(parkingUpdate.getNumCar() + 1);
			if (parkingUpdate.getCapacity() == parkingUpdate.getNumCar()) {
				parkingUpdate.setEmpty(false);
			}
			parkingRepository.save(parkingUpdate);

			if (optionalCar.get().getParking() != null) {
				ParkingEntity oldParking = optionalCar.get().getParking();
				oldParking.setNumCar(oldParking.getNumCar() - 1);
				if (oldParking.getNumCar() < oldParking.getCapacity()) {
					oldParking.setEmpty(true);
				}
				parkingRepository.save(oldParking);
			}

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
		optionalCar.get().setParking(parkingUpdate);
		// Lưu hình ảnh

		if (carUpdate.getImages() != null) {
			carImageService.deleteImgCarByCar(optionalCar.get());
			List<CarImageEntity> imageCarEntities = new ArrayList<>();
			for (MultipartFile imageFile : carUpdate.getImages()) {
				String fileCode = fileService.saveFile(imageFile.getOriginalFilename(), imageFile);
				CarImageEntity imageCar = new CarImageEntity();
				imageCar.setImageUrl(fileCode);
				imageCar.setCar(optionalCar.get()); // Gán CarEntity cho hình ảnh
				imageCarEntities.add(imageCar);
			}
			// Lưu tất cả các hình ảnh vào DB
			carImageRepository.saveAll(imageCarEntities);
		}

		return carRepository.save(optionalCar.get());
	}

	public CarEntity updateParking(long carId, long parkingId) {
        // Lấy xe theo carId
        Optional<CarEntity> optionalCar = carRepository.findById(carId);
        if (!optionalCar.isPresent()) {
            throw new NotFoundException("Not found car with id " + carId);
        }
        CarEntity carUpdate = optionalCar.get();
        // Lấy thông tin parkingUpdate theo parkingId
        ParkingEntity parkingUpdate = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new NotFoundException("Not found parking with id " + parkingId));
        // Cập nhật số lượng xe trong bãi đỗ
        parkingUpdate.setNumCar(parkingUpdate.getNumCar() + 1);

        // Kiểm tra nếu bãi đỗ đầy, cập nhật trạng thái là không trống
        if (parkingUpdate.getCapacity() == parkingUpdate.getNumCar()) {
            parkingUpdate.setEmpty(false);
        }
        // Lưu lại bãi đỗ đã cập nhật
        parkingRepository.save(parkingUpdate);
        // Nếu xe đã có bãi đỗ trước đó, xử lý bãi đỗ cũ
        if (carUpdate.getParking() != null) {
            ParkingEntity oldParking = carUpdate.getParking();
            oldParking.setNumCar(oldParking.getNumCar() - 1);
            // Kiểm tra nếu bãi đỗ cũ còn trống hay không
            if (oldParking.getNumCar() < oldParking.getCapacity()) {
                oldParking.setEmpty(true);
            }
            // Lưu lại bãi đỗ cũ đã cập nhật
            parkingRepository.save(oldParking);
        }
        // Cập nhật lại bãi đỗ cho xe
        carUpdate.setParking(parkingUpdate);
        // Lưu lại xe đã cập nhật
        return carRepository.save(carUpdate);
    }

//	public List<CarEntity> getCarByType(long idType) {
//		Optional<TypeEntity> optionalType = typeRepository.findById(idType);
//		if (!optionalType.isPresent()) {
//			throw new NotFoundException("Not found type with id " + idType);
//		}
//		List<CarEntity> listCars = carRepository.findByType_TypeId(idType);
//		if (listCars.isEmpty()) {
//			throw new NotFoundException("Not have car with type id " + idType);
//		}
//		return listCars;
//	}

	public Page<CarResponse> getCarPagingAndSearch(CarSearchRequest request) {
//		return carRepository.findAll(request.specification(), request.getPaging().pageable())
//				.map(car -> CarResponse.builder()
//						.carId(car.getCarId())
//						.name(car.getName())
//						.plateNumber(car.getPlateNumber())
//						.startLocation(car.getStartLocation())
//						.stopLocation(car.getStopLocation())
//						.startDate(car.getStartDate())
//						.build());
		return null;
	}
}
