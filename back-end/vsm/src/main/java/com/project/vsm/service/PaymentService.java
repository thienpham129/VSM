package com.project.vsm.service;

import com.project.vsm.config.VNPayConfig;
import com.project.vsm.dto.response.ResponseObject;
import com.project.vsm.dto.response.VNPayResponse;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.TicketRepository;
import com.project.vsm.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final TicketRepository ticketRepository;

    @Value("${payment.vietQR.bankID}")
    String BANK_ID;

    @Value("${payment.vietQR.accountNo}")
    String ACCOUNT_NO;

    @Value("${payment.vietQR.template}")
    String TEMPLATE;


    public String generateQrCode(double totalPrice, String ticketId, String email) {
        String bankID = BANK_ID;
        String accountNo = ACCOUNT_NO;
        String template = TEMPLATE;

        return String.format("https://img.vietqr.io/image/%s-%s-%s.png?amount=%f&addInfo=%s&accountName=%s",
                bankID,
                accountNo,
                template,
                totalPrice,
                ticketId,
                email);
    }

    public VNPayResponse generatePaymentUrl(String ticketId) {
        TicketEntity ticket = ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found !"));

        if (!"vietQR".equalsIgnoreCase(ticket.getPaymentEntity().getPaymentName())) {
            throw new RuntimeException("Unsupported payment method");
        }

        String paymentUrl = generateQrCode(ticket.getPrice(), ticket.getTicketId(), ticket.getAccount().getEmail());

        return VNPayResponse.builder()
                .paymentUrl(paymentUrl)
                .build();
    }
}
