package com.project.vsm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.vsm.dto.request.UpdateUserAndAccountRequest;
import com.project.vsm.model.UserEntity;
import com.project.vsm.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@NoArgsConstructor
public class UserController {

	@Autowired
	private UserService userService;


	@GetMapping("/user/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable long id) {
		Optional<UserEntity> userEntity = userService.getUserById(id);
		return new ResponseEntity<>(userEntity.get(), HttpStatus.OK);
	}


	@PostMapping("/user/{userId}")
	public ResponseEntity<UserEntity> updateUserById (@PathVariable long userId ,
                                                      @ModelAttribute  UpdateUserAndAccountRequest request,
                                                      @RequestPart ("imageFile") MultipartFile file){
		return new ResponseEntity<>(userService.updateUserById(userId , request , file) , HttpStatus.OK);
	}

	@PostMapping("/user/update-my-info")
	public ResponseEntity<UserEntity> updateProfile (@ModelAttribute  UpdateUserAndAccountRequest request,
													 @RequestPart ("imageFile") MultipartFile file) throws IOException {
		return new ResponseEntity<>(userService.getMyInfoToViewOrUpdate(request , file) , HttpStatus.OK);
	}

}
