package com.project.vsm.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.sercurity.UserPrinciple;

@RestController
public class TestController {
	@GetMapping("/public/test")
	public String test() {
		return "Hello";
	}

	@GetMapping("/secured")
	public String secured(@AuthenticationPrincipal UserPrinciple principle) {

		return "nếu thấy đã đăng nhập as email " + principle.getEmail() + "id: " + principle.getUserID();
	}

	@GetMapping("/admin")
	public String admin(@AuthenticationPrincipal UserPrinciple principle) {
		return "nếu thấy thì là admin";
	}
}
