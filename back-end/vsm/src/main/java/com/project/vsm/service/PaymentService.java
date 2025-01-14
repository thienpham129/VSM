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

    private final VNPayConfig vnPayConfig;

    public VNPayResponse createVnPayPayment(String ticketId, HttpServletRequest request) {
        TicketEntity ticket = ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket không tồn tại"));
        long amount = (long) (ticket.getPrice() * 100);

        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_TxnRef", ticketId);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toán vé ID: " + ticketId);
        vnpParamsMap.put("vnp_ReturnUrl", "http://localhost:8080/api/v1/payment/vn-pay-callback");


        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData); // Tạo chữ ký
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

        return VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl)
                .build();
    }

}
