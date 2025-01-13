package com.project.vsm.controller;


import com.project.vsm.dto.response.ResponseObject;
import com.project.vsm.dto.response.TicketGoogleSheetResponse;
import com.project.vsm.dto.response.VNPayResponse;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.ScheduleRepository;
import com.project.vsm.repository.TicketRepository;
import com.project.vsm.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Enumeration;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final TicketRepository ticketRepository;
    private final ScheduleRepository scheduleRepository;

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
    @GetMapping("/vn-pay")
    public ResponseObject<VNPayResponse> pay(@RequestParam String ticketId, HttpServletRequest request){
        VNPayResponse response = paymentService.createVnPayPayment(ticketId,request);
        return new ResponseObject<>(HttpStatus.OK.value(), "Success", response);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseObject<String> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        String ticketId = request.getParameter("vnp_TxnRef");

        if ("00".equals(status)) {
            TicketEntity ticket = ticketRepository.findById(ticketId)
                    .orElseThrow(() -> new RuntimeException("Ticket not found"));
            ScheduleEntity scheduleEntity = ticket.getScheduleEntity();
            if (scheduleEntity != null) {
                int emptySeat = scheduleEntity.getEmptySeat();
                int seatsBooked = ticket.getSelectedSeat().split(",").length;
                if (emptySeat >= seatsBooked) {
                    scheduleEntity.setEmptySeat(emptySeat - seatsBooked);
                    scheduleRepository.save(scheduleEntity);
                    ticket.setStatus("Đã thanh toán");
                    ticket.setPaid(true);
                    ticketRepository.save(ticket);
                }
            }
            return new ResponseObject<>(HttpStatus.OK.value(), "Payment successful", "Ticket ID: " + ticketId);
        } else {
            return new ResponseObject<>(HttpStatus.BAD_REQUEST.value(), "Payment failed", null);
        }
    }

}
