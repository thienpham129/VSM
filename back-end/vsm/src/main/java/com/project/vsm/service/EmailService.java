package com.project.vsm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender emailSender;

	public void sendVerificationEmail(String to, String subject, String text) throws MessagingException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text, true);

		emailSender.send(message);
	}

	public void sendEmailResetPassword(String email) {
		MimeMessage message = emailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setTo(email);
			helper.setSubject("Reset password");
			helper.setText("""
                    <div>
                      <a href="http://localhost:8080/forgot-password?email=%s" target="_blank">click link to verify</a>
                    </div>
                    """.formatted(email), true);
			emailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException("Send mail resetpassword fail :" + e.getMessage());
		}
	}
}
