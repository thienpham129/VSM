package com.project.vsm.service;

import com.project.vsm.dto.request.TicketRequest;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.dto.response.VNPayResponse;
import com.project.vsm.model.*;
import com.project.vsm.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class TicketService {
    TicketRepository ticketRepository;
    VoucherRepository voucherRepository;
    AccountRepository accountRepository;
    PaymentRepository paymentRepository;
    PaymentService paymentService;
    GoogleSheetsService googleSheetsService;


    public List<TicketResponse> getAllTicket() {
        List<TicketEntity> ticketEntities = ticketRepository.findAll();
        List<TicketResponse> ticketResponses = new ArrayList<>();

        for (TicketEntity ticket : ticketEntities) {

            TicketResponse ticketResponse = TicketResponse
                    .builder()
                    .ticketId(ticket.getTicketId())
                    .totalPrice(ticket.getPrice())
                    .isPaid(ticket.isPaid())
                    .startLocation(ticket.getStartLocation())
                    .stopLocation(ticket.getStopLocation())
                    .status(ticket.getStatus())
                    .QRPayment(ticket.getQRPayment())
                    .build();
            ScheduleEntity schedule = ticket.getScheduleEntity();
            ScheduleResponse scheduleResponse = new ScheduleResponse();

            if (schedule != null) {
                scheduleResponse.setScheduleId(schedule.getId());
                scheduleResponse.setStartTime(schedule.getStartTime());
                scheduleResponse.setEndTime(schedule.getEndTime());
                scheduleResponse.setStatus(schedule.getStatus());
            }
            ticketResponse.setScheduleResponse(scheduleResponse);
            ticketResponses.add(ticketResponse);
        }
        return ticketResponses;
    }

    public void deleteTicket(long tichketId) {
        TicketEntity ticket = ticketRepository.findById(tichketId).orElseThrow
                (() -> new RuntimeException("Cannot found ticket with id : " + tichketId));
        ticketRepository.delete(ticket);
    }

    public TicketResponse createTicket(TicketRequest request, HttpServletRequest httpRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        double priceOfSingleSeat = 10000;
        double totalPrice = priceOfSingleSeat * request.getSelectedSeat();

        VoucherEntity voucher = null;
        if (request.getVoucher() != null) {
            voucher = voucherRepository.findByCode(request.getVoucher())
                    .orElseThrow(() -> new RuntimeException("Voucher not found"));

            LocalDate currentDate = LocalDate.now();
            LocalDate expiredDate = voucher.getCreatedDate().plusDays(5);
            if (voucher.isValid() && expiredDate.isAfter(currentDate)) {
                double discount = voucher.getDiscount();
                totalPrice -= totalPrice * (discount / 100);
                voucher.setValid(false);
            } else {
                throw new RuntimeException("Voucher is expired or invalid");
            }
        }

        PaymentEntity payment = paymentRepository.findByPaymentName(request.getPaymentMethod())
                .orElseThrow(() -> new RuntimeException("Payment method not found"));

        TicketEntity ticket = request.toEntity(account, payment, voucher, totalPrice);
        ticketRepository.save(ticket);
        TicketResponse ticketResponse = TicketResponse.fromEntity(ticket);

        if (payment.getPaymentName().equalsIgnoreCase("vietQR")) {
            String qrCodeUrl = paymentService.generateQrCode(totalPrice , ticket.getTicketId() , account.getEmail());
            ticketResponse.setPaymentUrl(qrCodeUrl);
        }
        boolean paymentSuccess = checkPaymentStatus(ticket.getTicketId());

        if (paymentSuccess) {
            googleSheetsService.sendDataToGoogleSheet(ticket, totalPrice, payment.getPaymentName());
        }
        return ticketResponse;
    }

    private boolean checkPaymentStatus(long ticketId) {
        return true;
    }

}
