package com.project.vsm.service;

import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class TicketService {
    TicketRepository ticketRepository;

    public List<TicketResponse> getAllTicket() {
        List<TicketEntity> ticketEntities = ticketRepository.findAll();
        List<TicketResponse> ticketResponses = new ArrayList<>();

        for (TicketEntity ticket : ticketEntities) {
            TicketResponse ticketResponse = TicketResponse
                    .builder()
                    .ticketId(ticket.getTicketId())
                    .price(ticket.getPrice())
                    .paymentMethod(ticket.getPaymentMethod())
                    .isPaid(ticket.isPaid())
                    .startLocation(ticket.getStartLocation())
                    .stopLocation(ticket.getStopLocation())
                    .status(ticket.getStatus())
                    .QRPayment(ticket.getQRPayment())
                    .build();

            ticketResponses.add(ticketResponse);
        }
        return ticketResponses;
    }

    public void deleteTicket(long tichketId) {
        TicketEntity ticket = ticketRepository.findById(tichketId).orElseThrow
                (() -> new RuntimeException("Cannot found ticket with id : " + tichketId));
        ticketRepository.delete(ticket);
    }
}
