package com.project.vsm.controller;

import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.dto.response.ResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project.vsm.dto.RegisterUserDto;
import com.project.vsm.dto.VerifyUserDto;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.dto.request.LoginRequest;
import com.project.vsm.dto.response.LoginResponse;
import com.project.vsm.service.AuthService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
@Slf4j
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public LoginResponse login(@RequestBody @Validated LoginRequest request) {
		return authService.login(request.getEmail(), request.getPassword());
	}

	@PostMapping("/signup")
	public ResponseEntity<AccountEntity> register(@RequestBody RegisterUserDto registerUserDto) {
		AccountEntity registeredUser = authService.signup(registerUserDto);
		return ResponseEntity.ok(registeredUser);
	}

	@PostMapping("/verify")
	public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
		try {
			authService.verifyUser(verifyUserDto);
			return ResponseEntity.ok("Account verified successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/resend")
	public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
		try {
			authService.resendVerificationCode(email);
			return ResponseEntity.ok("Verification code sent");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword (@RequestParam String email){
		return new ResponseEntity<>(authService.forgotPassword(email) , HttpStatus.OK);
	}
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword (@RequestParam String email , @RequestBody ChangePasswordRequest request) {
		return new ResponseEntity<>(authService.resetPassword(email , request) , HttpStatus.OK);
	}


}
