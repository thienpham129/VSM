package com.project.vsm.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.vsm.dto.CreateDriverDTO;
import com.project.vsm.dto.DriverUpdateDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.repository.AccountRepository;

@Service
public class DriverService {

	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private FileService fileService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public AccountEntity updateDriverById(long id, DriverUpdateDTO driverUpdate) throws IOException {
		Optional<AccountEntity> optionalDriver = accountRepository.findById(id);
		if (!optionalDriver.isPresent() || !optionalDriver.get().getRole().equals("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + id);
		}
		optionalDriver.get().setAddress(driverUpdate.getAddress());
		optionalDriver.get().setFirstName(driverUpdate.getFirstName());
		optionalDriver.get().setLastName(driverUpdate.getLastName());
		optionalDriver.get().setPhoneNumber(driverUpdate.getPhoneNumber());
		optionalDriver.get().setDob(parseDate(driverUpdate.getDob()));

		if (driverUpdate.getImages() != null) {
			deleteIMGDriverLisence(id);
			MultipartFile imageFile1 = driverUpdate.getImages().get(0);
			String fileCode1 = fileService.saveFile(imageFile1.getOriginalFilename(), imageFile1);

			MultipartFile imageFile2 = driverUpdate.getImages().get(0);
			String fileCode2 = fileService.saveFile(imageFile2.getOriginalFilename(), imageFile2);
			optionalDriver.get().setImgDriverLisence1(fileCode1);
			optionalDriver.get().setImgDriverLisence2(fileCode2);
		}
		return accountRepository.save(optionalDriver.get());
	}

	private static LocalDate parseDate(String dateString) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		try {
			return LocalDate.parse(dateString, formatter);
		} catch (DateTimeParseException e) {
			throw new InvalidInputException("Lỗi parse ngày dd/mm/yyyy");
		}
	}

	public void deleteIMGDriverLisence(long idDriver) {
		Optional<AccountEntity> optionalDriver = accountRepository.findById(idDriver);
		if (!optionalDriver.isPresent()) {
			throw new NotFoundException("Not found driver with id " + idDriver);
		}
		optionalDriver.get().setImgDriverLisence1("");
		optionalDriver.get().setImgDriverLisence2("");
		accountRepository.save(optionalDriver.get());

	}

	public Optional<AccountEntity> getDriverById(long id) {
		Optional<AccountEntity> optionalDriver = accountRepository.findById(id);
		if (!optionalDriver.isPresent() || !optionalDriver.get().getRole().equals("ROLE_DRIVER")) {
			throw new NotFoundException("Not found driver with id " + id);
		}
		return optionalDriver;
	}

	private boolean checkExistEmail(String email) {
		return accountRepository.existsByEmail(email);
	}

	public AccountEntity createNewDriver(CreateDriverDTO driverDTO) {
		if (checkExistEmail(driverDTO.getEmail())) {
			throw new RuntimeException("Email already exists");
		}
		AccountEntity newDriver = new AccountEntity();
		newDriver.setEmail(driverDTO.getEmail());
		newDriver.setPassword(passwordEncoder.encode(driverDTO.getPassword()));
		newDriver.setRole("ROLE_DRIVER");
		newDriver.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
		newDriver.setEnabled(true);
		newDriver.setCreateDate(LocalDateTime.now());
		return accountRepository.save(newDriver);
	}

	public List<AccountEntity> getAllDriver() {
		List<AccountEntity> listDriver = accountRepository.findByRole("ROLE_DRIVER");
		if (listDriver.isEmpty()) {
			throw new NotFoundException("KHông có tài xế trong danh sách");

		}
		return listDriver;
	}

}
