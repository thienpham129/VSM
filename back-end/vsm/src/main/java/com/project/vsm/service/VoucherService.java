package com.project.vsm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.VoucherDTO;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.VoucherEntity;
import com.project.vsm.repository.VoucherRepository;

@Service
public class VoucherService {
	@Autowired
	private VoucherRepository voucherRepository;

	public Optional<VoucherEntity> getVoucherById(long id) {
		Optional<VoucherEntity> optionalVoucher = voucherRepository.findById(id);
		if (!optionalVoucher.isPresent()) {
			throw new NotFoundException("Not found voucher with id " + id);
		}
		return optionalVoucher;
	}

	public List<VoucherEntity> createNewVoucher(VoucherDTO voucherInput) {
		List<VoucherEntity> listVoucher = new ArrayList<>();
		for (int i = 0; i < voucherInput.getQuantity(); i++) {
			VoucherEntity voucherEntity = new VoucherEntity();
			voucherEntity.setDiscount(voucherInput.getDiscount());
			voucherEntity.setValid(true);
			voucherEntity.setCode(generateRandomString());
			listVoucher.add(voucherEntity);
		}
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

}