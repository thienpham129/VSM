package com.project.vsm.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.TicketResponseAdminDTO;
import com.project.vsm.dto.request.TicketRequest;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.dto.response.TicketResponse;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.PaymentEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.model.VoucherEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.PaymentRepository;
import com.project.vsm.repository.RouteRepository;
import com.project.vsm.repository.ScheduleRepository;
import com.project.vsm.repository.TicketRepository;
import com.project.vsm.repository.TypeRepository;
import com.project.vsm.repository.VoucherRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

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
	ScheduleRepository scheduleRepository;
	TypeRepository typeRepository;
	@Autowired
	private RouteRepository routeRepository;

	public List<TicketResponse> getAllTicket() {
		List<TicketEntity> ticketEntities = ticketRepository.findAll();
		List<TicketResponse> ticketResponses = new ArrayList<>();

		for (TicketEntity ticket : ticketEntities) {

			TicketResponse ticketResponse = TicketResponse.builder().ticketId(ticket.getTicketId())
					.totalPrice(ticket.getPrice()).isPaid(ticket.isPaid()).startLocation(ticket.getStartLocation())
					.stopLocation(ticket.getStopLocation()).status(ticket.getStatus()).QRPayment(ticket.getQRPayment())
					.selectedSeat(ticket.getSelectedSeat() != null ? Arrays.asList(ticket.getSelectedSeat().split(","))
							: new ArrayList<>())
					.build();
			ScheduleEntity schedule = ticket.getScheduleEntity();
			ScheduleResponse scheduleResponse = new ScheduleResponse();

			if (schedule != null) {
				scheduleResponse.setScheduleId(schedule.getId());
				scheduleResponse.setStartTime(schedule.getStartTime());
				scheduleResponse.setEndTime(schedule.getEndTime());
				scheduleResponse.setStatus(schedule.getStatus());
			}
			ticketResponse.setSchedules(scheduleResponse);
			ticketResponses.add(ticketResponse);
		}
		return ticketResponses;
	}

	public void deleteTicket(long tichketId) {
		TicketEntity ticket = ticketRepository.findById(tichketId)
				.orElseThrow(() -> new RuntimeException("Cannot found ticket with id : " + tichketId));
		ticketRepository.delete(ticket);
	}

	public TicketResponse createTicket(TicketRequest request) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		AccountEntity account = accountRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Account not found"));

		TypeEntity type = typeRepository.findById(request.getTypeId())
				.orElseThrow(() -> new RuntimeException("Type not found"));

		double priceOfSingleSeat = type.getPrice();
		double totalPrice = priceOfSingleSeat * request.getSelectedSeat().size();

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

		ScheduleEntity schedule = scheduleRepository.findById(request.getScheduleId())
				.orElseThrow(() -> new RuntimeException("Schedule not found"));

		TicketEntity ticket = request.toEntity(account, payment, voucher, totalPrice);
		ticket.setStartLocation(schedule.getStartLocation());
		ticket.setStopLocation(schedule.getStopLocation());
		ticket.setScheduleEntity(schedule);

		ticket = ticketRepository.save(ticket);

		if (payment.getPaymentName().equalsIgnoreCase("vietQR")) {
			String qrCodeUrl = paymentService.generateQrCode(totalPrice, ticket.getTicketId(), account.getEmail());
			ticket.setQRPayment(qrCodeUrl);
			ticketRepository.save(ticket);
		}
		boolean paymentSuccess = checkPaymentStatus(ticket.getTicketId());

		if (paymentSuccess) {
			googleSheetsService.sendDataToGoogleSheet(ticket, totalPrice, payment.getPaymentName());
		}
		return TicketResponse.fromEntity(ticket);
	}

	private boolean checkPaymentStatus(long ticketId) {
		return true;
	}

	public TicketResponse updateTicketById(String ticketId, TicketRequest request) {
        TicketEntity ticket = ticketRepository.findById(Long.valueOf(ticketId))
                .orElseThrow(() -> new RuntimeException("Not found ticket with id : " + ticketId));

        ticket.setEmail(request.getEmail());
        ticket.setFullName(request.getFullName());
        ticket.setNote(request.getNote());
        ticket.setPhoneNumber(request.getPhoneNumber());
        ticket.setSelectedSeat(request.getSelectedSeat().toString());

        ticketRepository.save(ticket);

        return TicketResponse.fromEntity(ticket);
    }      
    
	public List<TicketResponse> getAllTicketAdmin() {
		List<TicketEntity> ticketEntities = ticketRepository.findAll();
		List<TicketResponse> ticketResponses = new ArrayList<>();

		for (TicketEntity ticket : ticketEntities) {

			TicketResponse ticketResponse = TicketResponse.builder().ticketId(ticket.getTicketId())
					.totalPrice(ticket.getPrice()).isPaid(ticket.isPaid()).startLocation(ticket.getStartLocation())
					.stopLocation(ticket.getStopLocation()).status(ticket.getStatus()).QRPayment(ticket.getQRPayment())
					.selectedSeat(ticket.getSelectedSeat() != null ? Arrays.asList(ticket.getSelectedSeat().split(","))
							: new ArrayList<>())
					.fullName(ticket.getFullName()).phoneNumber(ticket.getPhoneNumber()).build();
			ScheduleEntity schedule = ticket.getScheduleEntity();
			ScheduleResponse scheduleResponse = new ScheduleResponse();

			if (schedule != null) {
				scheduleResponse.setScheduleId(schedule.getId());
				scheduleResponse.setStartTime(schedule.getStartTime());
				scheduleResponse.setEndTime(schedule.getEndTime());
				scheduleResponse.setStatus(schedule.getStatus());
			}
			ticketResponse.setSchedules(scheduleResponse);
			ticketResponses.add(ticketResponse);
		}
		return ticketResponses;
	}



    private boolean checkPaymentStatus(String ticketId) {
        return true;
    }

    public List<TicketResponse> getTicketByScheduleId(long scheduleId) {
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Not found schedule with id : " + scheduleId));

        List<TicketEntity> tickets = ticketRepository.getTicketByScheduleId(scheduleId);
        if (tickets.isEmpty()) {
            throw new RuntimeException("Not found ticket with schedule id : " + scheduleId);
        }

        return tickets.stream()
                .map(TicketResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public TicketResponse updateStatusTicketById(String ticketId, TicketRequest request) {
        TicketEntity ticket = ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Not found ticket with id : " + ticketId));

        ticket.setStatus(request.getStatus());
        ticket.setPaid(true);
        ticketRepository.save(ticket);
        return TicketResponse.fromEntity(ticket);
    }

	public TicketResponseAdminDTO getTicketByIDAdmin(long id) {
		Optional<TicketEntity> optionalTicket = ticketRepository.findById(id);
		if (!optionalTicket.isPresent()) {
			throw new NotFoundException("Not found Ticket with id " + id);
		}
		RouteEntity routeEntity = routeRepository.findByStartLocationAndStopLocation(
				optionalTicket.get().getScheduleEntity().getRoute().getStartLocation(),
				optionalTicket.get().getScheduleEntity().getRoute().getStopLocation()).get(0);
		if (routeEntity == null) {
			throw new NotFoundException("Not found Route ");
		}
		TicketResponseAdminDTO ticketDetail = TicketResponseAdminDTO.builder()
				.ticketId(optionalTicket.get().getTicketId()).price(optionalTicket.get().getPrice())
				.paymentMethod(optionalTicket.get().getPaymentMethod()).isPaid(optionalTicket.get().isPaid())
				.status(optionalTicket.get().getStatus()).QRPayment(optionalTicket.get().getQRPayment())
				.selectedSeat(optionalTicket.get().getSelectedSeat()).note(optionalTicket.get().getNote())
				.email(optionalTicket.get().getEmail()).fullName(optionalTicket.get().getFullName())
				.phoneNumber(optionalTicket.get().getPhoneNumber())
				.detailAddressDropOff(optionalTicket.get().getDetailAddressDropOff())
				.detailAddressPickUp(optionalTicket.get().getDetailAddressPickUp()).route(routeEntity).build();
		return ticketDetail;
	}
}
