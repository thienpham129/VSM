package com.project.vsm.service;

import java.time.LocalDateTime;


import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.RegisterUserDto;
import com.project.vsm.dto.VerifyUserDto;
import com.project.vsm.dto.request.ChangePasswordRequest;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.dto.response.LoginResponse;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.sercurity.JwtIssuer;
import com.project.vsm.sercurity.UserPrinciple;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthService {

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private EmailService emailService;
	@Autowired
	private JwtIssuer jwtIssuer;
	@Autowired
	private AuthenticationManager authenticationManager;


	public LoginResponse login(String email, String password) {
		AccountEntity user = accountRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!user.isEnabled()) {
			throw new RuntimeException("Account not verified. Please verify your account.");
		}
//
		var authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(email, password));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		var principal = (UserPrinciple) authentication.getPrincipal();

		var roles = principal.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority())
				.toList();

		var token = jwtIssuer.issuer(principal.getUserID(), principal.getEmail(), roles);

		return LoginResponse.builder().accessToken(token).build();
	}
	
	public AccountEntity identifyUser(String email) {
		AccountEntity user = accountRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		return user;
	}

	public AccountEntity signup(RegisterUserDto input) {
		if (accountRepository.existsByEmail(input.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		AccountEntity account = new AccountEntity(input.getEmail(), passwordEncoder.encode(input.getPassword()));
		account.setVerificationCode(generateVerificationCode());
		account.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
		account.setEnabled(false);
		account.setRole("ROLE_USER");
		account.setCreateDate(LocalDateTime.now());
		sendVerificationEmail(account);

		return accountRepository.save(account);
	}

	public void verifyUser(VerifyUserDto input) {
		Optional<AccountEntity> optionalUser = accountRepository.findByEmail(input.getEmail());
		if (optionalUser.isPresent()) {
			AccountEntity user = optionalUser.get();
			System.out.println(user);
			if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
				throw new RuntimeException("Verification code has expired");
			}
			if (user.getVerificationCode().equals(input.getVerificationCode())) {
				user.setEnabled(true);
				user.setVerificationCode(null);
				user.setVerificationCodeExpiresAt(null);
				accountRepository.save(user);
			} else {
				throw new RuntimeException("Invalid verification code");
			}
		} else {
			throw new RuntimeException("User not found");
		}
	}

	private void sendVerificationEmail(AccountEntity user) {
		String subject = "Account Verification";
		String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
		String htmlMessage = "<html>" + "<body style=\"font-family: Arial, sans-serif;\">"
				+ "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
				+ "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
				+ "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
				+ "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
				+ "<h3 style=\"color: #333;\">Verification Code:</h3>"
				+ "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
				+ "</div>" + "</div>" + "</body>" + "</html>";

		try {
			emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	private String generateVerificationCode() {
		Random random = new Random();
		int code = random.nextInt(900000) + 100000;
		return String.valueOf(code);
	}

	public void resendVerificationCode(String email) {
		Optional<AccountEntity> optionalUser = accountRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			AccountEntity user = optionalUser.get();
			if (user.isEnabled()) {
				throw new RuntimeException("Account is already verified");
			}
			user.setVerificationCode(generateVerificationCode());
			user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
			sendVerificationEmail(user);
			accountRepository.save(user);
		} else {
			throw new RuntimeException("User not found");
		}
	}
	
    public boolean forgotPassword(String email) {
        try {
            Optional<AccountEntity> account = accountRepository.findByEmail(email);
            if (account.isEmpty()) {
                throw new RuntimeException("Cannot found email : " + email);
            }
            emailService.sendEmailResetPassword(email);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Send mail forgot password fail!" + e.getMessage());
        }
    }

    public boolean resetPassword(String email, ChangePasswordRequest request) {
        try {
           AccountEntity account = accountRepository.findByEmail(email)
                   .orElseThrow(() -> new RuntimeException("Email not found"));

            if (!request.getNewPassword().equals(request.getNewPasswordRepeat())) {
                throw new RuntimeException("New password and password repeat not macth!");
            }
            account.setPassword(passwordEncoder.encode(request.getNewPasswordRepeat()));
            accountRepository.save(account);
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Send mail reset password fail!" + e.getMessage());
        }
    }
}