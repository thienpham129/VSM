package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.controller.model.AccountEntity;
import com.project.vsm.repository.UserRepository;



@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public Optional<AccountEntity> findByEmail(String email) {

		var user = userRepository.findByEmail(email);
		System.out.println(user);
		if (user.isPresent()) {
			return user;
		}
		return Optional.empty();
	}
}
