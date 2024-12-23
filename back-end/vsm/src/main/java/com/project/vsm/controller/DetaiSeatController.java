package com.project.vsm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.vsm.dto.CreateDetailSeatDTO;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.service.DetailSeatServicer;

import jakarta.validation.Valid;

@Controller
public class DetaiSeatController {
	@Autowired
	private DetailSeatServicer detailSeatService;

	@PostMapping("admin/detailSeat")
	public ResponseEntity<TypeEntity> createDetailSeat(@RequestParam long idType,
			@Valid @RequestBody List<CreateDetailSeatDTO> input) {
		TypeEntity updatedTypeEntity = detailSeatService.createNewDetailSeat(idType, input);
		return new ResponseEntity<>(updatedTypeEntity, HttpStatus.CREATED);
	}

	@PutMapping("admin/detailSeat")
	public ResponseEntity<TypeEntity> updateDetailSeat(@RequestParam long idType,
			@Valid @RequestBody List<CreateDetailSeatDTO> input) {
		TypeEntity updatedTypeEntity = detailSeatService.updateDetailSeats(idType, input);
		return new ResponseEntity<>(updatedTypeEntity, HttpStatus.CREATED);
	}
}
