package com.project.vsm.controller;

import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.dto.request.UpdateAccountRequest;
import com.project.vsm.dto.response.ChangePasswordResponse;
import com.project.vsm.dto.response.ResponseObject;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.service.AccountService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins = "*")
@NoArgsConstructor
public class UserController {

	@Autowired
	private AccountService accountService;

	@GetMapping("/user/{id}")
	public ResponseEntity<AccountEntity> getUserById(@PathVariable long id) {
		Optional<AccountEntity> userEntity = accountService.getUserById(id);
		return new ResponseEntity<>(userEntity.get(), HttpStatus.OK);
	}

	@PostMapping("/user/{userId}")
	public ResponseEntity<AccountEntity> updateUserById(@PathVariable long userId,
			@ModelAttribute UpdateAccountRequest request,
			@RequestPart("imageFile") MultipartFile file) {
		return new ResponseEntity<>(accountService.updateUserById(userId, request, file), HttpStatus.OK);
	}

	@PostMapping("/user/update-my-info")
	public ResponseEntity<AccountEntity> updateProfile (@ModelAttribute UpdateAccountRequest request,
														@RequestPart (value = "urlImage" , required = false)
														MultipartFile file) throws IOException {
		return new ResponseEntity<>(accountService.getMyInfoToViewOrUpdate(request , file) , HttpStatus.OK);
	}
	
	@PostMapping("/user/change-password")
	public ResponseObject<ChangePasswordResponse> changePassword (@RequestBody ChangePasswordRequest request) {
			return new ResponseObject<>(HttpStatus.OK , "Success" , accountService.changePassword(request));
	}
	
//	@GetMapping("/user/view-my-schedule")
//	public ResponseEntity<List<ScheduleResponse>> getScheduleOfUser () {
//		return new ResponseEntity<>(accountService.getScheduleOfAccount(), HttpStatus.OK);
//	}

	
}


