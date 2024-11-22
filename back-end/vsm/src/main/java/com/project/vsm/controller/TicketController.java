package com.project.vsm.controller;

import java.io.IOException;
import java.util.List;

import com.project.vsm.dto.request.TicketRequest;
import com.project.vsm.model.TicketEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/public/tickets/create")
    public ResponseEntity<TicketResponse> createTickets(@RequestBody TicketRequest ticketRequest) throws IOException {
        return new ResponseEntity<>(ticketService.createTicket(ticketRequest) , HttpStatus.OK);
    }

    @PutMapping("/admin/update/ticket/{ticketId}")
    public ResponseEntity<TicketResponse> updateTicketById (@PathVariable long ticketId ,@RequestBody TicketRequest request){
        return new ResponseEntity<>(ticketService.updateTicketById(ticketId , request),HttpStatus.OK);
    }

    @GetMapping("/admin/ticket-with-schedule/{scheduleId}")
    public ResponseEntity<List<TicketResponse>> getTicketByScheduleId (@PathVariable long scheduleId) {
        return new ResponseEntity<>(ticketService.getTicketByScheduleId(scheduleId) , HttpStatus.OK);
    }

}
