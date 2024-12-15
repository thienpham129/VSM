package com.project.vsm.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.DashboardStatsDTO;
import com.project.vsm.dto.RevenueStatDTO;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.TicketEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.RouteRepository;
import com.project.vsm.repository.ScheduleRepository;
import com.project.vsm.repository.TicketRepository;

@Service
public class DashboardService {
	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private RouteRepository routeRepository;
	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	private AccountRepository accountRepository;

//	public List<Double> getListRevenue() {
//		List<TicketEntity> ticketEntities = ticketRepository.findAll();
//		Map<Month, Double> revenueByMonth = ticketEntities.stream().filter(
//				ticket -> ticket.getScheduleEntity() != null && ticket.getScheduleEntity().getStartTime() != null)
//				.collect(Collectors.groupingBy(ticket -> ticket.getScheduleEntity().getStartTime().getMonth(),
//						Collectors.summingDouble(TicketEntity::getPrice)));
//		List<Double> revenueList = IntStream.rangeClosed(1, 12)
//				.mapToObj(month -> revenueByMonth.getOrDefault(Month.of(month), 0.0)).collect(Collectors.toList());
//		return revenueList;
//	}

	public Map<Integer, List<Integer>> getRouteFrequencyData() {
		List<TicketEntity> ticketEntities = ticketRepository.findAll();
		List<RouteEntity> routeEntities = routeRepository.findAll();
		List<String> routes = routeEntities.stream()
				.map(route -> route.getStartLocation() + " → " + route.getStopLocation()).collect(Collectors.toList());

		Map<Integer, List<Integer>> frequencyData = new HashMap<>();
		for (int i = 1; i <= 12; i++) {
			frequencyData.put(i, new ArrayList<>(Collections.nCopies(routes.size(), 0)));
		}
		ticketEntities.forEach(ticket -> {
			int month = ticket.getScheduleEntity().getStartTime().getMonthValue();
			String startLocation = ticket.getScheduleEntity().getRoute().getStartLocation();
			String stopLocation = ticket.getScheduleEntity().getRoute().getStopLocation();
			String routeLabel = startLocation + " → " + stopLocation;
			int routeIndex = routes.indexOf(routeLabel);
			if (routeIndex != -1) {
				List<Integer> monthData = frequencyData.get(month);
				monthData.set(routeIndex, monthData.get(routeIndex) + 1);
			} else {
				System.out.println("Tuyến đường không khớp: " + routeLabel);
			}
		});
		return frequencyData;
	}

	public List<Map<String, Object>> getDriverScheduleCountByMonth(int year) {
		List<Object[]> rawData = scheduleRepository.findDriverScheduleCountByMonth(year);
		Map<String, int[]> driverDataMap = new HashMap<>();
		// Xử lý dữ liệu thô
		for (Object[] row : rawData) {
			String driverName = (String) row[0];
			int month = (int) row[1];
			long tripCount = (long) row[2];

			driverDataMap.putIfAbsent(driverName, new int[12]);
			driverDataMap.get(driverName)[month - 1] = (int) tripCount; // Gán vào mảng theo chỉ số 0-11
		}
		// Chuyển đổi thành định dạng JSON
		List<Map<String, Object>> response = new ArrayList<>();
		for (Map.Entry<String, int[]> entry : driverDataMap.entrySet()) {
			Map<String, Object> driverData = new HashMap<>();
			driverData.put("label", entry.getKey());
			driverData.put("data", entry.getValue());
			response.add(driverData);
		}
		return response;
	}

	public List<Map<String, Object>> getRouteTicketStatistics() {
		List<Object[]> queryResult = ticketRepository.countTicketsByRouteAndMonth();
		// Tổ chức dữ liệu kết quả
		Map<String, int[]> routeDataMap = new LinkedHashMap<>();
		for (Object[] row : queryResult) {
			String routeLabel = (String) row[0];
			int month = (int) row[1];
			long ticketCount = (long) row[2];
			// Khởi tạo nếu chưa có tuyến đường
			routeDataMap.putIfAbsent(routeLabel, new int[12]);
			// Gán giá trị vào đúng tháng
			routeDataMap.get(routeLabel)[month - 1] = (int) ticketCount;
		}
		// Chuyển đổi sang định dạng yêu cầu
		List<Map<String, Object>> result = new ArrayList<>();
		for (Map.Entry<String, int[]> entry : routeDataMap.entrySet()) {
			Map<String, Object> routeData = new HashMap<>();
			routeData.put("label", entry.getKey());
			routeData.put("data", entry.getValue());
			result.add(routeData);
		}

		return result;
	}

	public RevenueStatDTO getCurrentMonthRevenueStat() {
		// Lấy tháng và năm hiện tại
		LocalDate now = LocalDate.now();
		YearMonth currentMonth = YearMonth.from(now);
		YearMonth previousMonth = currentMonth.minusMonths(1);

		// Tính tổng doanh thu của tháng hiện tại
		double currentMonthRevenue = ticketRepository.sumRevenueByMonth(currentMonth.getYear(),
				currentMonth.getMonthValue());

		// Tính tổng doanh thu của tháng trước
		double previousMonthRevenue = ticketRepository.sumRevenueByMonth(previousMonth.getYear(),
				previousMonth.getMonthValue());

		// Tính % tăng trưởng
		double increasePercentage = 0.0;
		if (previousMonthRevenue > 0) {
			increasePercentage = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
		}

		// Tạo đối tượng kết quả
		RevenueStatDTO revenueStat = new RevenueStatDTO();
		revenueStat.setTitle(String.format("%.2f", currentMonthRevenue)); // Định dạng doanh thu
		revenueStat.setIncrease(String.format("%.2f", increasePercentage) + "%"); // Định dạng tăng trưởng

		return revenueStat;
	}

	public DashboardStatsDTO getTicketStatsForCurrentMonth() {
		LocalDate today = LocalDate.now();
		int currentMonth = today.getMonthValue();
		int currentYear = today.getYear();

		// Lấy tổng số vé đã đặt trong tháng hiện tại
		long currentMonthTickets = ticketRepository.countTicketsByMonthAndYear(currentMonth, currentYear);

		// Lấy tổng số vé đã đặt trong tháng trước
		int previousMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
		int previousYear = (currentMonth == 1) ? currentYear - 1 : currentYear;
		long previousMonthTickets = ticketRepository.countTicketsByMonthAndYear(previousMonth, previousYear);

		// Tính tỷ lệ tăng trưởng
		double increase = 0.0;
		if (previousMonthTickets > 0) {
			increase = ((double) (currentMonthTickets - previousMonthTickets) / previousMonthTickets) * 100;
		}

		// Trả về kết quả
		return new DashboardStatsDTO(String.valueOf(currentMonthTickets), // Title (Số vé trong tháng hiện tại)
				String.format("%.2f", increase) + "%" // Increase (% so với tháng trước)
		);
	}

	public Map<String, Object> getScheduleStatsForCurrentMonth() {
		LocalDateTime now = LocalDateTime.now();
		int currentMonth = now.getMonthValue();
		int currentYear = now.getYear();
		int previousMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
		// Get total number of schedules for the current month
		long currentMonthSchedules = scheduleRepository.countSchedulesByMonthAndYear(currentMonth, currentYear);
		// Get total number of schedules for the previous month
		long previousMonthSchedules = scheduleRepository.countSchedulesByPreviousMonthAndYear(previousMonth,
				currentYear);
		// Calculate the increase percentage
		double increase = 0.0;
		if (previousMonthSchedules > 0) {
			increase = ((double) (currentMonthSchedules - previousMonthSchedules) / previousMonthSchedules) * 100;
		}
		// Prepare response
		Map<String, Object> result = new HashMap<>();
		result.put("title", currentMonthSchedules);
		result.put("increase", String.format("%.2f%%", increase));
		return result;
	}

	public Map<String, Object> getAccountStats() {
		LocalDateTime now = LocalDateTime.now();
		int currentMonth = now.getMonthValue();
		int currentYear = now.getYear();
		int previousMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
		// Lấy tổng số tài khoản được tạo trong tháng hiện tại
		long currentMonthAccounts = accountRepository.countAccountsByCurrentMonth(currentMonth, currentYear);
		// Lấy tổng số tài khoản được tạo trong tháng trước
		long previousMonthAccounts = accountRepository.countAccountsByPreviousMonth(previousMonth, currentYear);
		// Tính phần trăm thay đổi
		double increase = 0.0;
		if (previousMonthAccounts > 0) {
			increase = ((double) (currentMonthAccounts - previousMonthAccounts) / previousMonthAccounts) * 100;
		}
		// Trả về kết quả
		Map<String, Object> result = new HashMap<>();
		result.put("title", currentMonthAccounts); // Tổng tài khoản tạo trong tháng hiện tại
		result.put("increase", String.format("%.2f%%", increase)); // Tính phần trăm tăng trưởng
		return result;
	}
	public List<Double> getListRevenue() {
		List<TicketEntity> ticketEntities = ticketRepository.findAll();
		List<TicketEntity> paidTickets = ticketEntities.stream().filter(TicketEntity::isPaid)
				.collect(Collectors.toList());
		Map<Month, Double> revenueByMonth = paidTickets.stream().filter(
				ticket -> ticket.getScheduleEntity() != null && ticket.getScheduleEntity().getStartTime() != null) 
				.collect(Collectors.groupingBy(ticket -> ticket.getScheduleEntity().getStartTime().getMonth(), 
						Collectors.summingDouble(TicketEntity::getPrice)
				));
		List<Double> revenueList = IntStream.rangeClosed(1, 12)
				.mapToObj(month -> revenueByMonth.getOrDefault(Month.of(month), 0.0)) 																	
				.collect(Collectors.toList());

		return revenueList;
	}
}
