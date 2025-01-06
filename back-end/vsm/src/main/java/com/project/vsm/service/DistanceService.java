package com.project.vsm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.DistanceInputDTO;
import com.project.vsm.model.DistanceEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.DistanceRepository;
import com.project.vsm.repository.ScheduleRepository;

@Service
public class DistanceService {

	@Autowired
	private DistanceRepository distanceRepository;
	@Autowired
	private ScheduleRepository scheduleRepository;

	public String addNewDistance(DistanceInputDTO distanceInputDTO) {
		// Lấy thông tin từ DTO
		String point1 = distanceInputDTO.getPoint1();
		String point2 = distanceInputDTO.getPoint2();
		int distance = distanceInputDTO.getDistance();
		long scheduleId = distanceInputDTO.getScheduleId();

		// Kiểm tra xem Schedule có tồn tại không
		ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new RuntimeException("Schedule không tồn tại."));

		// Tạo một thực thể DistanceEntity mới
		DistanceEntity newPoint = new DistanceEntity(point1, point2, distance, schedule);

		// Lưu khoảng cách mới vào cơ sở dữ liệu
		distanceRepository.save(newPoint);

		return "Khoảng cách mới đã được thêm thành công.";
	}

	
}
