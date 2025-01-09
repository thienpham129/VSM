package com.project.vsm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.MoveOrderDTO;
import com.project.vsm.model.MoveOrderEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.MoveOrderRepository;
import com.project.vsm.repository.ScheduleRepository;

@Service
public class MoveOrderService {
	@Autowired
	private MoveOrderRepository moveOrderRepository;
	@Autowired
	private ScheduleRepository scheduleRepository;

	public MoveOrderEntity createMoveOrder(MoveOrderDTO moveOrderDTO) {
		// Tìm ScheduleEntity từ scheduleId
		ScheduleEntity schedule = scheduleRepository.findById(moveOrderDTO.getScheduleId())
				.orElseThrow(() -> new RuntimeException("Schedule not found with id: " + moveOrderDTO.getScheduleId()));
		// Tạo mới MoveOrderEntity từ DTO
		MoveOrderEntity moveOrder = new MoveOrderEntity();
		moveOrder.setPickupOrder(moveOrderDTO.getPickupOrder());
		moveOrder.setDropoffOrder(moveOrderDTO.getDropoffOrder());
		moveOrder.setSchedule(schedule); // Liên kết với ScheduleEntity
		// Lưu MoveOrder vào cơ sở dữ liệu
		return moveOrderRepository.save(moveOrder);
	}

	public MoveOrderEntity getMoveOrderById(Long id) {
		return moveOrderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("MoveOrder not found with id: " + id));
	}

	public List<MoveOrderEntity> getAllMoveOrders() {
		return moveOrderRepository.findAll();
	}

	public MoveOrderEntity getMoveOrderByScheduleId(Long scheduleId) {
		return moveOrderRepository.findBySchedule_Id(scheduleId);
	}

	public MoveOrderEntity updateMoveOrder(MoveOrderDTO moveOrderDTO, long idMoveOrder) {
		// Tìm MoveOrderEntity theo ID
		MoveOrderEntity moveOrder = moveOrderRepository.findById(idMoveOrder)
				.orElseThrow(() -> new RuntimeException("MoveOrder not found with id: " + idMoveOrder));
		// Tìm ScheduleEntity theo Schedule ID từ DTO
		ScheduleEntity schedule = scheduleRepository.findById(moveOrderDTO.getScheduleId())
				.orElseThrow(() -> new RuntimeException("Schedule not found with id: " + moveOrderDTO.getScheduleId()));
		// Cập nhật các trường trong MoveOrderEntity
		moveOrder.setPickupOrder(moveOrderDTO.getPickupOrder());
		moveOrder.setDropoffOrder(moveOrderDTO.getDropoffOrder());
		moveOrder.setSchedule(schedule); // Liên kết lại ScheduleEntity
		// Lưu lại MoveOrder đã cập nhật
		return moveOrderRepository.save(moveOrder);
	}
}
