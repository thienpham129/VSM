package com.project.vsm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.model.UserEntity;
import com.project.vsm.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/user/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable long id) {
		Optional<UserEntity> userEntity = userService.getUserById(id);
		return new ResponseEntity<>(userEntity.get(), HttpStatus.OK);
	}
}
