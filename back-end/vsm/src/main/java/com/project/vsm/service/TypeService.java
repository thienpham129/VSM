package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.TypeDTO;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.TypeRepository;

@Service
public class TypeService {
	@Autowired
	private TypeRepository typeRepository;

	public Optional<TypeEntity> getTypeById(long id) {
		Optional<TypeEntity> optionalType = typeRepository.findById(id);
		if (!optionalType.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}
		return optionalType;
	}

	public TypeEntity createNewType(TypeDTO type) {
		TypeEntity newType = type.convertToEntity(type);
		return typeRepository.save(newType);
	}

	public Iterable<TypeEntity> getAllTypes() {
		Iterable<TypeEntity> listTypeEntities = typeRepository.findAll();
		return listTypeEntities;
	}

	public TypeEntity updateTypeById(long id, TypeDTO typeInput) {
		Optional<TypeEntity> optionalEntity = typeRepository.findById(id);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}
		TypeEntity newType = typeInput.convertToEntity(typeInput);
		newType.setTypeId(id);
		return typeRepository.save(newType);
	}

	public TypeEntity deleteTypeById(long id) {
		Optional<TypeEntity> optionalEntity = typeRepository.findById(id);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}
		typeRepository.delete(optionalEntity.get());
		return optionalEntity.get();
	}
}
