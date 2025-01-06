package com.project.vsm.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.CarCreateDTO;
import com.project.vsm.dto.CarUpdateDTO;
import com.project.vsm.dto.request.CarSearchRequest;
import com.project.vsm.dto.request.PagingRequest;
import com.project.vsm.dto.response.CarResponse;
import com.project.vsm.dto.response.PageableResponse;
import com.project.vsm.dto.response.PagingResponse;
import com.project.vsm.model.CarEntity;
import com.project.vsm.service.CarService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class CarController {

	@Autowired
	private CarService carService;

	@GetMapping("public/car/{id}")
	public ResponseEntity<CarEntity> getCarById(@PathVariable long id) {
		Optional<CarEntity> carEntity = carService.getCarById(id);
		return new ResponseEntity<>(carEntity.get(), HttpStatus.OK);
	}

	@PostMapping("admin/car")
	public ResponseEntity<CarEntity> createCar(@Valid @ModelAttribute CarCreateDTO carDTO) throws IOException {
		CarEntity newCar = carService.createNewCar(carDTO);
		return new ResponseEntity<>(newCar, HttpStatus.CREATED);
	}

	@GetMapping("/public/cars")
	public ResponseEntity<Iterable<CarEntity>> getAllCars() {
		return new ResponseEntity<>(carService.getAllCars(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/car/{id}")
	public ResponseEntity<CarEntity> deleteCarById(@PathVariable long id) {
		return new ResponseEntity<>(carService.deleteCarById(id), HttpStatus.OK);
	}

	@PutMapping("/admin/car/{id}")
	public ResponseEntity<CarEntity> updateCarById(@PathVariable long id, @Valid @ModelAttribute CarUpdateDTO carInput)
			throws IOException {
		return new ResponseEntity<>(carService.updateCarById(id, carInput), HttpStatus.OK);
	}

	@PutMapping("/driver/update-parking")
	public ResponseEntity<CarEntity> updateParking(@RequestParam long carId, @RequestParam long parkingId) {
		CarEntity updatedCar = carService.updateParking(carId, parkingId);
		return ResponseEntity.ok(updatedCar);
	}

//    @GetMapping("/public/cars/{typeId}")
//    public ResponseEntity<List<CarEntity>> getCarByType(@PathVariable long typeId) {
//        List<CarEntity> carEntity = carService.getCarByType(typeId);
//        return new ResponseEntity<>(carEntity, HttpStatus.OK);
//    }

	@PostMapping("/public/cars/search")
	public ResponseEntity<PagingResponse<CarResponse>> getCarPagingAndSearch(@RequestBody CarSearchRequest request) {
		final Page<CarResponse> cars = carService.getCarPagingAndSearch(request);
		final PagingRequest paging = request.getPaging();
		return new ResponseEntity<>(new PagingResponse<CarResponse>().setContents(cars.getContent()).setPaging(
				new PageableResponse().setPageNumber(paging.getPage() - 1).setToltalPage(cars.getTotalPages())
						.setPageSize(paging.getSize()).setTotalRecord(cars.getTotalElements())),
				HttpStatus.OK);
	}
}