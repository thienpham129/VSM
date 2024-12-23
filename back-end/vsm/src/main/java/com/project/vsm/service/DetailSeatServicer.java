package com.project.vsm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.CreateDetailSeatDTO;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.DetailSeat;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.DetailSeatRepository;
import com.project.vsm.repository.TypeRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DetailSeatServicer {
	@Autowired
	private DetailSeatRepository detailSeatRepository;
	@Autowired
	private TypeRepository typeRepository;

	public TypeEntity createNewDetailSeat(long idType, List<CreateDetailSeatDTO> listInput) {
		TypeEntity typeEntity = typeRepository.findById(idType)
				.orElseThrow(() -> new NotFoundException("Type not found for id: " + idType));
		for (CreateDetailSeatDTO createDetailSeatDTO : listInput) {
			DetailSeat newDetailSeat = new DetailSeat();
			newDetailSeat.setTypeEntity(typeEntity); // Liên kết với TypeEntity
			newDetailSeat.setPosition(createDetailSeatDTO.getPosition()); // Cập nhật vị trí ghế
			newDetailSeat.setSurcharge(createDetailSeatDTO.getSurcharge()); // Cập nhật phụ thu
			detailSeatRepository.save(newDetailSeat); // Lưu vào cơ sở dữ liệu
		}
		return typeEntity;
	}

	@Transactional
	public TypeEntity updateDetailSeats(long idType, List<CreateDetailSeatDTO> listInput) {
		TypeEntity typeEntity = typeRepository.findById(idType)
				.orElseThrow(() -> new NotFoundException("Type not found for id: " + idType));
		detailSeatRepository.deleteByTypeEntityId(idType);
		for (CreateDetailSeatDTO createDetailSeatDTO : listInput) {
			DetailSeat newDetailSeat = new DetailSeat();
			newDetailSeat.setTypeEntity(typeEntity); // Liên kết với TypeEntity
			newDetailSeat.setPosition(createDetailSeatDTO.getPosition()); // Cập nhật vị trí ghế
			newDetailSeat.setSurcharge(createDetailSeatDTO.getSurcharge()); // Cập nhật phụ thu
			detailSeatRepository.save(newDetailSeat); // Lưu vào cơ sở dữ liệu
		}
		return typeEntity;
	}
}
