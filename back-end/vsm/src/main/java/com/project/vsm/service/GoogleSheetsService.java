package com.project.vsm.service;

import com.project.vsm.model.TicketEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleSheetsService {
    @Value("${google.sheet.spread.sheetID}")
    String SPREADSHEET_ID;

    public void sendDataToGoogleSheet(TicketEntity ticket, double totalPrice, String paymentMethod) {
        String googleSheetUrl = SPREADSHEET_ID;
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestData = new HashMap<>();
        requestData.put("Mã_GD", String.valueOf(ticket.getTicketId()));
        requestData.put("Nội_dung", "Thanh toán vé: " + ticket.getTicketId());
        requestData.put("Giá_tiền", String.valueOf(totalPrice));
        requestData.put("Ngày_diễn_ra", LocalDate.now().toString());

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(googleSheetUrl, requestData, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("Gửi dữ liệu thành công lên Google Sheets.");
            } else {
                System.out.println("Lỗi khi gửi dữ liệu: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Không thể gửi dữ liệu lên Google Sheets.");
            System.out.println("Không thể gửi dữ liệu lên Google Sheets 123");
        }
    }
}
