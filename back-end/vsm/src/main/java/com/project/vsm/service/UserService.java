package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.UserEntity;
import com.project.vsm.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public UserEntity createUser(AccountEntity account) {
		UserEntity newUser = new UserEntity();
		newUser.setAccount(account);
		newUser.setGender("Male");
		newUser.setNumBoking(0);
		newUser.setUrlImage("");// default image
		return userRepository.save(newUser);
	}
	
	public Optional<UserEntity> getUserById(long id) {
		Optional<UserEntity> optionalUser = userRepository.findById(id);
		if (!optionalUser.isPresent()) {
			throw new NotFoundException("Not found user with id " + id);
		}
		return optionalUser;
	}
}
