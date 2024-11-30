package com.project.vsm.controller;

import com.project.vsm.dto.response.TicketGoogleSheetResponse;
import com.project.vsm.service.GoogleSheetsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/v1/google-sheet")
@RequiredArgsConstructor
public class GoogleSheetController {

    @Autowired
    private GoogleSheetsService googleSheetsService;

    @GetMapping("/check-ticket/{ticketId}")
    public ResponseEntity<TicketGoogleSheetResponse> updateStatusTicketBaseGoogleSheet (@PathVariable long ticketId) {
        return new ResponseEntity<>(googleSheetsService.updateTicketStatusFromGoogleSheet(ticketId) , HttpStatus.OK);
    }

    @GetMapping("/admin/get-data-googlesheet")
    public void getDataFromGoogleSheet () throws GeneralSecurityException, IOException {
        googleSheetsService.getDataFromGoogleSheet();
    }
}
