package com.project.vsm.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.SendVoucherDTO;
import com.project.vsm.dto.VoucherDTO;
import com.project.vsm.dto.response.VoucherResponse;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.VoucherEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.VoucherRepository;

import jakarta.mail.MessagingException;

@Service
public class VoucherService {
	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private EmailService emailService;

	public Optional<VoucherEntity> getVoucherById(long id) {
		Optional<VoucherEntity> optionalVoucher = voucherRepository.findById(id);
		if (!optionalVoucher.isPresent()) {
			throw new NotFoundException("Not found voucher with id " + id);
		}
		return optionalVoucher;
	}

	public List<VoucherEntity> createNewVoucher(VoucherDTO voucherInput) {
		List<VoucherEntity> listVoucher = new ArrayList<>();
		// Lấy expiredDate từ voucherInput
		LocalDate expiredDate = voucherInput.getExpiredDate();
		for (int i = 0; i < voucherInput.getQuantity(); i++) {
			VoucherEntity voucherEntity = new VoucherEntity();
			voucherEntity.setDiscount(voucherInput.getDiscount());
			voucherEntity.setValid(true);
			voucherEntity.setCode(generateRandomString());
			voucherEntity.setCreatedDate(LocalDate.now());
			voucherEntity.setExpiredDate(expiredDate); // Sử dụng expiredDate từ DTO
			listVoucher.add(voucherEntity);
		}
		// Lưu danh sách các voucher vào database
		for (VoucherEntity voucherEntity : listVoucher) {
			voucherRepository.save(voucherEntity);
		}
		return listVoucher;
	}

	public Iterable<VoucherEntity> getAllVouchers() {
		Iterable<VoucherEntity> listVoucher = voucherRepository.findAll();
		return listVoucher;
	}

	public VoucherEntity updateUseVoucher(String code) {
		Optional<VoucherEntity> optionalEntity = voucherRepository.findByCode(code);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found voucher with code " + code);
		}
		VoucherEntity newVoucher = optionalEntity.get();
		newVoucher.setValid(false);
		return voucherRepository.save(newVoucher);
	}

	public VoucherEntity deleteVoucherById(long id) {
		Optional<VoucherEntity> optionalEntity = voucherRepository.findById(id);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found voucher with id " + id);
		}
		voucherRepository.delete(optionalEntity.get());
		return optionalEntity.get();
	}

	public String deleteAllVouchers() {
		voucherRepository.deleteAll();
		return "Deleting success";
	}

	public String generateRandomString() {
		String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
		StringBuilder sb = new StringBuilder(10);
		for (int i = 0; i < 10; i++) {
			int index = random.nextInt(CHARACTERS.length());
			sb.append(CHARACTERS.charAt(index));
		}

		return sb.toString();
	}

	public void sendDiscountEmail(String content, String discount, AccountEntity user) {
		String subject = "Mã giảm giá";
		String discountMessage = "Mã giảm giá của bạn là: " + discount;

		String htmlMessage = "<html>" + "<body style=\"font-family: Arial, sans-serif;\">"
				+ "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
				+ "<h2 style=\"color: #333;\">Chào bạn!</h2>" + "<p style=\"font-size: 16px;\">" + content + "</p>"
				+ "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
				+ "<h3 style=\"color: #333;\">Mã Giảm Giá:</h3>"
				+ "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + discountMessage + "</p>"
				+ "</div>" + "</div>" + "</body>" + "</html>";

		try {
			emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new NotFoundException("Lỗi khi gửi mã giảm giá!");
		}
	}

	public String sendVoucher(SendVoucherDTO input) {
		List<AccountEntity> listUser = accountRepository.findByRole("ROLE_USER");
		for (AccountEntity user : listUser) {
			VoucherEntity voucher = createNewVoucher(new VoucherDTO(input.getDiscount(), 1, input.getExpiredDate()))
					.get(0);
			sendDiscountEmail(input.getContent(), voucher.getCode(), user);
		}
		return "Gửi mã thành công";
	}

	public VoucherResponse checkVoucherUseOrNot(String code) {
		VoucherEntity voucher = voucherRepository.findByCode(code)
				.orElseThrow(() -> new RuntimeException("Mã khuyến mãi hết hạn hoặc không đúng"));

		if (!voucher.isValid() || !voucher.getCode().equals(code)) {
			return new VoucherResponse("Mã khuyến mãi hết hạn hoặc không đúng");
		} else {
			return new VoucherResponse(voucher.getDiscount(), "Mã hợp lệ có thể sử dụng");
		}
	}
}
