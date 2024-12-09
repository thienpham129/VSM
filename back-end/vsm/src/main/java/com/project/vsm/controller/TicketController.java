package com.project.vsm.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.dto.TicketResponseAdminDTO;
import com.project.vsm.dto.request.TicketRequest;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.service.TicketService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@CrossOrigin(origins = "*")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TicketController {
	TicketService ticketService;

	@GetMapping("/public/tickets")
	public ResponseEntity<List<TicketResponse>> getAllTickets() {
		return new ResponseEntity<>(ticketService.getAllTicket(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/ticket/{ticketId}")
	public String deleteTicketById(@PathVariable int ticketId) {
		ticketService.deleteTicket(ticketId);
		return "Delete ticket has successfully";
	}

	@PostMapping("/public/tickets/create")
	public ResponseEntity<TicketResponse> createTickets(@RequestBody TicketRequest ticketRequest) throws IOException {
		return new ResponseEntity<>(ticketService.createTicket(ticketRequest), HttpStatus.OK);
	}

	@GetMapping("/public/ticket-with-schedule/{scheduleId}")
	public ResponseEntity<List<TicketResponse>> getTicketByScheduleIdPublic(@PathVariable long scheduleId) {
		return new ResponseEntity<>(ticketService.getTicketByScheduleId(scheduleId), HttpStatus.OK);
	}

	@PutMapping("/driver/update-status/ticket/{ticketId}")
	public ResponseEntity<TicketResponse> updateStatusTicketById(@PathVariable long ticketId,
			@RequestBody TicketRequest request) {
		return new ResponseEntity<>(ticketService.updateStatusTicketById(ticketId, request), HttpStatus.OK);
	}

	@PutMapping("/admin/update/ticket/{ticketId}")
	public ResponseEntity<TicketResponse> updateTicketById(@PathVariable long ticketId,
			@RequestBody TicketRequest request) {
		return new ResponseEntity<>(ticketService.updateTicketById(ticketId, request), HttpStatus.OK);
	}

	@GetMapping("/admin/ticket-with-schedule/{scheduleId}")
	public ResponseEntity<List<TicketResponse>> getTicketByScheduleId(@PathVariable long scheduleId) {
		return new ResponseEntity<>(ticketService.getTicketByScheduleId(scheduleId), HttpStatus.OK);
	}

	// @PutMapping("/admin/update-status/ticket/{ticketId}")
	// public ResponseEntity<TicketResponse> updateStatusTicketById(@PathVariable
	// long ticketId,
	// @RequestBody TicketRequest request) {
	// return new ResponseEntity<>(ticketService.updateStatusTicketById(ticketId,
	// request), HttpStatus.OK);
	// }

	@GetMapping("/admin/tickets")
	public ResponseEntity<List<TicketResponse>> getAllTicketsAdmin() {
		return new ResponseEntity<>(ticketService.getAllTicketAdmin(), HttpStatus.OK);
	}

	@GetMapping("driver/ticket/{id}")
	public ResponseEntity<TicketResponseAdminDTO> getTicketByIdAdmin(@PathVariable long id) {
		TicketResponseAdminDTO ticket = ticketService.getTicketByIDAdmin(id);
		return new ResponseEntity<>(ticket, HttpStatus.OK);
	}

	@GetMapping("public/ticket/check/{id}")
	public ResponseEntity<Boolean> checkTicketPaid(@PathVariable long id) {
		return new ResponseEntity<>(ticketService.checkTicketPaid(id), HttpStatus.OK);
	}
}
