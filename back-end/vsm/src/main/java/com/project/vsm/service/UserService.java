package com.project.vsm.service;

import com.project.vsm.dto.request.UpdateUserAndAccountRequest;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.UserEntity;
import com.project.vsm.repository.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@NoArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserEntity createUser(AccountEntity account) {
        UserEntity newUser = new UserEntity();
        newUser.setAccount(account);
        newUser.setGender("Male");
        newUser.setNumBooking(0);
        newUser.setUrlImage("");// default image
        return userRepository.save(newUser);
    }

    public UserEntity updateUserById(Long userId, UpdateUserAndAccountRequest request, MultipartFile file) {

        UserEntity userEntity = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Cannot found user with id : " + userId));
        try {
            String uploadImage = fileService.saveFile(file.getOriginalFilename(), file);

            userEntity.setUrlImage(uploadImage);
            userEntity.setNumBooking(request.getNumBooking());
            userEntity.setGender(request.getGender());

            AccountEntity accountEntity = userEntity.getAccount();

            if (accountEntity != null) {
                accountEntity.setPassword(passwordEncoder.encode(request.getPassword()));
                accountEntity.setFirstName(request.getFirstName());
                accountEntity.setLastName(request.getLastName());
                accountEntity.setDob(request.getDob());
                accountEntity.setAddress(request.getAddress());

                userEntity.setAccount(accountEntity);
            }
        } catch (RuntimeException | IOException e) {
            throw new RuntimeException("Update user fail!");
        }
        return userRepository.save(userEntity);
    }

    public Optional<UserEntity> getUserById(long id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            throw new NotFoundException("Not found user with id " + id);
        }
        return optionalUser;
    }
}