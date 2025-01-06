package com.project.vsm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.MoveOrderDTO;
import com.project.vsm.model.MoveOrderEntity;
import com.project.vsm.service.MoveOrderService;

@RestController
public class MoveOrderController {
	@Autowired
	private MoveOrderService moveOrderService;

	// Tạo MoveOrder
	@PostMapping("/driver/move-order")
	public ResponseEntity<MoveOrderEntity> createMoveOrder(@RequestBody MoveOrderDTO moveOrderDTO) {
		MoveOrderEntity moveOrder = moveOrderService.createMoveOrder(moveOrderDTO);
		return ResponseEntity.ok(moveOrder);
	}

	// Lấy MoveOrder theo ID
	@GetMapping("/driver/move-order/{id}")
	public ResponseEntity<MoveOrderEntity> getMoveOrderById(@PathVariable Long id) {
		MoveOrderEntity moveOrder = moveOrderService.getMoveOrderById(id);
		return ResponseEntity.ok(moveOrder);
	}

	// Lấy tất cả MoveOrder
	@GetMapping("/driver/move-order")
	public ResponseEntity<List<MoveOrderEntity>> getAllMoveOrders() {
		List<MoveOrderEntity> moveOrders = moveOrderService.getAllMoveOrders();
		return ResponseEntity.ok(moveOrders);
	}

	@GetMapping("/driver/move-order-schedule/{scheduleId}")
	public ResponseEntity<MoveOrderEntity> getMoveOrderByScheduleId(@PathVariable Long scheduleId) {
		MoveOrderEntity moveOrder = moveOrderService.getMoveOrderByScheduleId(scheduleId);
		if (moveOrder == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(moveOrder);
	}

	@PutMapping("/driver/move-order-schedule/{id}")
	public ResponseEntity<MoveOrderEntity> updateMoveOrder(@PathVariable("id") Long id,
			@RequestBody MoveOrderDTO moveOrderDTO) {
		MoveOrderEntity updatedMoveOrder = moveOrderService.updateMoveOrder(moveOrderDTO, id);
		return ResponseEntity.ok(updatedMoveOrder);
	}
}
