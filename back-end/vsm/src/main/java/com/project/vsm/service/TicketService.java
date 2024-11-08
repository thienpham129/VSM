package com.project.vsm.service;

import com.project.vsm.dto.request.TicketRequest;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.model.VoucherEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.TicketRepository;
import com.project.vsm.repository.VoucherRepository;
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
    CarRepository carRepository;
    VoucherRepository voucherRepository;
    AccountRepository accountRepository;

    public List<TicketResponse> getAllTicket() {
        List<TicketEntity> ticketEntities = ticketRepository.findAll();
        List<TicketResponse> ticketResponses = new ArrayList<>();

        for (TicketEntity ticket : ticketEntities) {
            TicketResponse ticketResponse = TicketResponse
                    .builder()
                    .ticketId(ticket.getTicketId())
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

    public TicketResponse createTicket(TicketRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        CarEntity carEntity = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Cannot find car with the given ID :" + request.getCarId()));

        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        double priceOfSingleSeat = carEntity.getPriceOfSingleSeat();
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
            } else {
                throw new RuntimeException("Voucher is expired or invalid");
            }
        }

        // Tạo và lưu ticket
        TicketEntity ticket = TicketEntity.builder()
                .selectedSeat(request.getSelectedSeat())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .note(request.getNote())
                .startLocation(request.getStartLocation())
                .stopLocation(request.getStopLocation())
                .price(totalPrice)
                .car(carEntity)
                .voucher(voucher)
                .account(account)
                .build();

        ticketRepository.save(ticket);

        return TicketResponse.fromEntity(ticket);
    }

}
