package com.project.vsm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.TypeDTO;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.service.TypeService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class TypeContronller {

	@Autowired
	private TypeService typeService;

	@PostMapping("/type")
	public ResponseEntity<TypeEntity> createNewCategory(@Valid @RequestBody TypeDTO typeInput) {
		return new ResponseEntity<>(typeService.createNewType(typeInput), HttpStatus.OK);
	}

	@GetMapping("/type/{id}")
	public ResponseEntity<TypeEntity> getTypeById(@PathVariable long id) {
		Optional<TypeEntity> typeEntity = typeService.getTypeById(id);
		return new ResponseEntity<>(typeEntity.get(), HttpStatus.OK);
	}

	@GetMapping("/types")
	public ResponseEntity<Iterable<TypeEntity>> getAllTypes() {
		return new ResponseEntity<>(typeService.getAllTypes(), HttpStatus.OK);
	}

	@PutMapping("/type/{id}")
	public ResponseEntity<TypeEntity> updateTypeById(@PathVariable long id, @Valid @RequestBody TypeDTO typeInput) {
		return new ResponseEntity<>(typeService.updateTypeById(id, typeInput), HttpStatus.OK);
	}

	@DeleteMapping("/type/{id}")
	public ResponseEntity<TypeEntity> deleteTypeById(@PathVariable long id) {
		return new ResponseEntity<>(typeService.deleteTypeById(id), HttpStatus.OK);
	}
}
