package com.project.vsm.controller;


import com.project.vsm.dto.response.ResponseObject;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.dto.response.VNPayResponse;
import com.project.vsm.service.PaymentService;
import com.project.vsm.service.TicketService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final TicketService ticketService;

    @GetMapping("/pay/{ticketId}")
    public ResponseObject<VNPayResponse> payForTicket(@PathVariable String ticketId) {
       try {
           return ResponseObject.<VNPayResponse>builder()
                   .code(200)
                   .message("General QR successfully")
                   .data(paymentService.generatePaymentUrl(ticketId))
                   .build();
       }catch (RuntimeException e){
           return ResponseObject.<VNPayResponse>builder()
                   .code(400)
                   .message("General QR fail!")
                   .build();
       }
    }
}
