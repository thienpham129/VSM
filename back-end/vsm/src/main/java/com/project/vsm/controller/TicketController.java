package com.project.vsm.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/admin/tickets")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        return new ResponseEntity<>(ticketService.getAllTicket(), HttpStatus.OK);
    }

    @DeleteMapping("/admin/ticket/{ticketId}")
    public String deleteTicketById(@PathVariable int ticketId) {
        ticketService.deleteTicket(ticketId);
        return "Delete ticket has successfully";
    }

//    @PostMapping("public/tickets/create")
//    public ResponseEntity<TicketResponse> createTickets(@RequestBody TicketRequest request) {
//        return new ResponseEntity<>(ticketService.createTicket(request) , HttpStatus.OK);
//    }

}
