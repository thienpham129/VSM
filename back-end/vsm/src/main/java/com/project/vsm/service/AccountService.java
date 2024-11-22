package com.project.vsm.service;

import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.dto.request.UpdateAccountRequest;
import com.project.vsm.dto.response.ChangePasswordResponse;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.AccountRepository;
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


@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private FileService fileService;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;


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

        } catch (IOException I) {
            throw new RuntimeException("Update user fail!");
        }
        return accountRepository.save(accountEntity);
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
            return accountRepository.save(accountEntity);
        } catch (RuntimeException e) {
            throw new RuntimeException("Update info fail!");
        }

    }

    public Optional<AccountEntity> getUserById(long id) {
        Optional<AccountEntity> optionalUser = accountRepository.findById(id);
        if (!optionalUser.isPresent()) {
            throw new NotFoundException("Not found user with id " + id);
        }
        return optionalUser;
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

        return ChangePasswordResponse.builder()
                .message("Change password successfully")
                .build();
    }

    public List<ScheduleResponse> getScheduleOfAccount () {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AccountEntity accountEntity = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cannot find account with email: " + email));

        List<ScheduleResponse> response = new ArrayList<>();
        for (ScheduleEntity schedule : accountEntity.getSchedules()) {
            ScheduleResponse scheduleResponse =  ScheduleResponse.fromEntity(schedule);
            response.add(scheduleResponse);
        }
        return response;
    }

}
