package com.project.vsm.service;

import com.project.vsm.config.VNPayConfig;
import com.project.vsm.dto.response.VNPayResponse;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.TicketRepository;
import com.project.vsm.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPayConfig vnPayConfig;
    private final TicketRepository ticketRepository;

    @Value("${payment.vietQR.bankID}")
    String BANK_ID;

    @Value("${payment.vietQR.accountNo}")
    String ACCOUNT_NO;

    @Value("${payment.vietQR.template}")
    String TEMPLATE;

    public VNPayResponse createVnPayPayment(Long ticketId, HttpServletRequest request) {
        TicketEntity ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        long amount = (long) (ticket.getPrice() * 100);

        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }

    public String generateQrCode(double totalPrice, long ticketId, String email) {
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
}
