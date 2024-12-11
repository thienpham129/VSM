package com.project.vsm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.SendVoucherDTO;
import com.project.vsm.dto.VoucherDTO;
import com.project.vsm.model.VoucherEntity;
import com.project.vsm.service.VoucherService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class VoucherController {

	@Autowired
	private VoucherService voucherService;

	@PostMapping("/admin/voucher")
	public ResponseEntity<List<VoucherEntity>> createNewVoucher(@Valid @RequestBody VoucherDTO voucherInput) {
		return new ResponseEntity<>(voucherService.createNewVoucher(voucherInput), HttpStatus.OK);
	}

	@GetMapping("/public/voucher/{id}")
	public ResponseEntity<VoucherEntity> getVoucherById(@PathVariable long id) {
		Optional<VoucherEntity> voucherEntity = voucherService.getVoucherById(id);
		return new ResponseEntity<>(voucherEntity.get(), HttpStatus.OK);
	}

	@GetMapping("admin/vouchers")
	public ResponseEntity<Iterable<VoucherEntity>> getAllVoucher() {
		return new ResponseEntity<>(voucherService.getAllVouchers(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/voucher/{id}")
	public ResponseEntity<VoucherEntity> deleteVoucherById(@PathVariable long id) {
		return new ResponseEntity<>(voucherService.deleteVoucherById(id), HttpStatus.OK);
	}

	@DeleteMapping("/admin/vouchers")
	public ResponseEntity<String> deleteAllVouchers() {
		return new ResponseEntity<>(voucherService.deleteAllVouchers(), HttpStatus.OK);
	}

	@PutMapping("/public/voucher")
	public ResponseEntity<VoucherEntity> updateVoucherByCode(@RequestParam String code) {
		return new ResponseEntity<>(voucherService.updateUseVoucher(code), HttpStatus.OK);
	}

	@PostMapping("/admin/send-voucher")
	public ResponseEntity<String> sendVoucher(@Valid @RequestBody SendVoucherDTO input) {
		return new ResponseEntity<>(voucherService.sendVoucher(input), HttpStatus.OK);
	}

}
