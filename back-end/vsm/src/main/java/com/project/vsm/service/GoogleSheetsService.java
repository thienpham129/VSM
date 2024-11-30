package com.project.vsm.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.project.vsm.SheetsQuickstart;
import com.project.vsm.dto.response.TicketGoogleSheetResponse;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GoogleSheetsService {
    @Value("${google.sheet.spread.sheetID}")
    String SPREADSHEET_ID;

    @Value("${google.sheet.spread.sheetURL}")
    String SHEET_URL;

    @Autowired
    private TicketRepository ticketRepository;

    private static final String APPLICATION_NAME = "Google Sheets API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "";

    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        InputStream in = SheetsQuickstart.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    public void getDataFromGoogleSheet() throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final String spreadsheetId = "1unBOFItnNztTXPQBW3-KufybO5MWeF0XObko-Aq0dY0";
        final String range = "Sheet1";
        Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();

        ValueRange response = service.spreadsheets().values().get(spreadsheetId, range).execute();
        List<List<Object>> values = response.getValues();
        if (values == null || values.isEmpty()) {
            System.out.println("No data found.");
        } else {
            System.out.printf("%-10s %-80s %-15s %-20s %-15s %-20s %-10s%n",
                    "Mã GD", "Nội dung", "Số tiền", "Ngày diễn ra", "Số tài khoản", "Mã tham chiếu", "Số dư");

            for (List<Object> row : values) {
                System.out.printf("%-10s %-80s %-15s %-20s %-15s %-20s %-10s%n",
                        row.get(0), row.get(1), row.get(2), row.get(3),
                        row.get(4), row.get(5), row.get(6));
            }

        }
    }


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
        }
    }

    public TicketGoogleSheetResponse updateTicketStatusFromGoogleSheet(long ticketId) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(SHEET_URL, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                String content = response.getBody();
                List<String> rows = parseRowsFromGoogleSheet(content);

                for (String row : rows) {
                    if (row.contains(String.valueOf(ticketId))) {
                        TicketEntity ticket = ticketRepository.findById(ticketId)
                                .orElseThrow(() -> new RuntimeException("Ticket not found"));
                        if (!ticket.isPaid()) {
                            ticket.setStatus("Đã thanh toán");
                            ticket.setPaid(true);
                            ticketRepository.save(ticket);
                            return new TicketGoogleSheetResponse("Đã thanh toán", true);
                        } else {
                            return new TicketGoogleSheetResponse("Vé đã được thanh toán", true);
                        }
                    }
                }
                return new TicketGoogleSheetResponse("Không tìm thấy ticketId trong Google Sheets", false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new TicketGoogleSheetResponse("Có lỗi xảy ra", false);
    }

    private List<String> parseRowsFromGoogleSheet(String content) {
        return Arrays.asList(content.split("\n"));
    }
}
