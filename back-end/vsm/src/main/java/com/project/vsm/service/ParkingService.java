package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.ParkingDTO;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.ParkingEntity;
import com.project.vsm.repository.ParkingRepository;

@Service
public class ParkingService {

	@Autowired
	private ParkingRepository parkingRepository;

	public Optional<ParkingEntity> getParkingById(long id) {
		Optional<ParkingEntity> optionalParking = parkingRepository.findById(id);
		if (!optionalParking.isPresent()) {
			throw new NotFoundException("Not found paringking lot with id " + id);
		}
		return optionalParking;
	}

	public ParkingEntity createNewParking(ParkingDTO parkingDTO) {
		ParkingEntity newParking = parkingDTO.convertToEntity();
		newParking.setNumCar(0);
		newParking.setEmpty(true);
		return parkingRepository.save(newParking);
	}

	public Iterable<ParkingEntity> getAllParkings() {
		Iterable<ParkingEntity> listParkings = parkingRepository.findAll();
		return listParkings;
	}

	public ParkingEntity updateParkingById(long id, ParkingDTO parkingInput) {
		Optional<ParkingEntity> optionalParking = parkingRepository.findById(id);
		if (!optionalParking.isPresent()) {
			throw new NotFoundException("Not found parking with id " + id);
		}
		optionalParking.get().setId(id);
		optionalParking.get().setCapacity(parkingInput.getCapacity());
		optionalParking.get().setLocation(parkingInput.getLocation());
		optionalParking.get().setName(parkingInput.getName());
		return parkingRepository.save(optionalParking.get());
	}

	public ParkingEntity deleteParkingById(long id) {
		Optional<ParkingEntity> optionalParking = parkingRepository.findById(id);
		if (!optionalParking.isPresent()) {
			throw new NotFoundException("Not found parking lot with id " + id);
		}
		parkingRepository.delete(optionalParking.get());
		return optionalParking.get();
	}
}
