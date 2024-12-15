package com.project.vsm.service;


import java.io.IOException;
import java.util.Optional;


import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.dto.request.UpdateAccountRequest;
import com.project.vsm.dto.response.ChangePasswordResponse;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.AccountRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.project.vsm.dto.UserCreateDTO;


@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private FileService fileService;

	@Autowired
	@Lazy
	private PasswordEncoder passwordEncoder;

	public List<AccountEntity> getAllUser() {
		List<AccountEntity> listUser = accountRepository.findByRole("ROLE_USER");
		if (listUser.isEmpty()) {
			throw new NotFoundException("KHông có user trong danh sách");

		}
		return listUser;
	}

	public AccountEntity createNewUser(UserCreateDTO userDTO) {
		var user = accountRepository.findByEmail(userDTO.getEmail());
		if (user.isPresent()) {
			throw new InvalidInputException("Tồn tại user với email: " + userDTO.getEmail());
		}
		AccountEntity newUser = new AccountEntity();
		newUser.setEmail(userDTO.getEmail());
		newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		newUser.setFirstName("Firstname");
		newUser.setLastName("Lastname");
		newUser.setAvailable(true);
		newUser.setCreateDate(LocalDateTime.now());
		newUser.setEnabled(true);
		newUser.setRole("ROLE_USER");
		return accountRepository.save(newUser);
	}

	public Optional<AccountEntity> banUnbanUser(long id) {
		Optional<AccountEntity> optionalUser = accountRepository.findById(id);
		if (!optionalUser.isPresent()) {
			throw new NotFoundException("Not found user with id " + id);
		}
		optionalUser.get().setAvailable(!optionalUser.get().isAvailable());
		optionalUser.get().setEnabled(!optionalUser.get().isEnabled());
		accountRepository.save(optionalUser.get());
		return optionalUser;
	}

	public Optional<AccountEntity> findByEmail(String email) {

		var user = accountRepository.findByEmail(email);
		System.out.println(user);
		if (user.isPresent()) {
			return user;
		}
		return Optional.empty();
	}

	 public AccountEntity updateUserById(Long userId, UpdateAccountRequest request, MultipartFile file) {

	        AccountEntity accountEntity = accountRepository.findById(userId).orElseThrow(
	                () -> new RuntimeException("Cannot found user with id : " + userId));
	        try {
	            String uploadImage = fileService.saveFile(file.getOriginalFilename(), file);

	            accountEntity.setUrlImage(uploadImage);
	            accountEntity.setGender(request.getGender());
	            accountEntity.setFirstName(request.getFirstName());
	            accountEntity.setLastName(request.getLastName());
	            accountEntity.setDob(request.getDob());
	            accountEntity.setAddress(request.getAddress());
	            accountEntity.setPhoneNumber(request.getPhoneNumber());

	        } catch (IOException I) {
	            throw new RuntimeException("Update user fail!");
	        }
	        return accountRepository.save(accountEntity);
	    }

    

    public Optional<AccountEntity> getUserById(long id) {
        Optional<AccountEntity> optionalUser = accountRepository.findById(id);
        if (!optionalUser.isPresent()) {
            throw new NotFoundException("Not found user with id " + id);
        }
        return optionalUser;
    }
    

	public AccountEntity getMyInfoToViewOrUpdate(UpdateAccountRequest request, MultipartFile file) throws IOException {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		AccountEntity accountEntity = accountRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Cannot find account with email: " + email));
		try {
			if (file != null && !file.isEmpty()) {
				String uploadImage = fileService.saveFile(file.getOriginalFilename(), file);
				accountEntity.setUrlImage(uploadImage);
			}
			accountEntity.setGender(request.getGender());
			accountEntity.setFirstName(request.getFirstName());
			accountEntity.setLastName(request.getLastName());
			accountEntity.setAddress(request.getAddress());
			accountEntity.setDob(request.getDob());
			accountEntity.setPhoneNumber(request.getPhoneNumber());
			return accountRepository.save(accountEntity);
		} catch (RuntimeException e) {
			throw new RuntimeException("Update info fail!");
		}

	}


	public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		AccountEntity accountEntity = accountRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Cannot find account with email: " + email));

		if (!passwordEncoder.matches(request.getOldPassword(), accountEntity.getPassword())) {
			throw new RuntimeException("Old password is incorrect");
		}

		if (request.getOldPassword().equals(request.getNewPassword())) {
			throw new RuntimeException("New password must be different from the old password");
		}
		accountEntity.setPassword(passwordEncoder.encode(request.getNewPassword()));
		accountRepository.save(accountEntity);

		return ChangePasswordResponse.builder().message("Change password successfully").build();
	}

    // public List<ScheduleResponse> getScheduleOfAccount() {
    //     String email = SecurityContextHolder.getContext().getAuthentication().getName();
    //     AccountEntity accountEntity = accountRepository.findByEmail(email)
    //             .orElseThrow(() -> new RuntimeException("Cannot find account with email: " + email));

    //     return accountEntity.getSchedules().stream()
    //             .map(ScheduleResponse::fromEntity)
    //             .collect(Collectors.toList());
    // }

    public List<TicketResponse> getTicketOfAccount() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AccountEntity accountEntity = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cannot find account with email: " + email));

        return accountEntity.getTickets().stream().map(TicketResponse::fromEntity).collect(Collectors.toList());
    }

}


