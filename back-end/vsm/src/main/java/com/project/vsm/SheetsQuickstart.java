package com.project.vsm;

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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

public class SheetsQuickstart {
    private static final String APPLICATION_NAME = "Google Sheets API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

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

    public static void main(String... args) throws IOException, GeneralSecurityException {
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
                // Xử lý mỗi cột bằng cách kiểm tra số lượng phần tử trong row
                String maGD = row.size() > 0 ? row.get(0).toString() : "";
                String noiDung = row.size() > 1 ? row.get(1).toString() : "";
                String soTien = row.size() > 2 ? row.get(2).toString() : "";
                String ngayDienRa = row.size() > 3 ? row.get(3).toString() : "";
                String soTaiKhoan = row.size() > 4 ? row.get(4).toString() : "";
                String maThamChieu = row.size() > 5 ? row.get(5).toString() : "";
                String soDu = row.size() > 6 ? row.get(6).toString() : "";

                System.out.printf("%-10s %-80s %-15s %-20s %-15s %-20s %-10s%n",
                        maGD, noiDung, soTien, ngayDienRa, soTaiKhoan, maThamChieu, soDu);
                if (row.size() >= 7) {
                    System.out.printf("%-10s %-80s %-15s %-20s %-15s %-20s %-10s%n",
                            row.get(0), row.get(1), row.get(2), row.get(3),
                            row.get(4), row.get(5), row.get(6));
                } 
            }
        }
    }
}
