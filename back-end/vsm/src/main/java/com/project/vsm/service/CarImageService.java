package com.project.vsm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarImageEntity;
import com.project.vsm.repository.CarImageRepository;

@Service
public class CarImageService {
	@Autowired
	private CarImageRepository carImageRepository;

	public void deleteImgCarByCar(CarEntity car) {
		List<CarImageEntity> images = carImageRepository.findByCar(car);
		for (CarImageEntity image : images) {
			carImageRepository.delete(image);
		}
	}
}