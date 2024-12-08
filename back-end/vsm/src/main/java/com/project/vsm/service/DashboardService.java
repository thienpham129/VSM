package com.project.vsm.service;

import java.time.Month;
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

import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.TicketEntity;
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

	public List<Double> getListRevenue() {
		List<TicketEntity> ticketEntities = ticketRepository.findAll();
		Map<Month, Double> revenueByMonth = ticketEntities.stream().filter(
				ticket -> ticket.getScheduleEntity() != null && ticket.getScheduleEntity().getStartTime() != null)
				.collect(Collectors.groupingBy(ticket -> ticket.getScheduleEntity().getStartTime().getMonth(),
						Collectors.summingDouble(TicketEntity::getPrice)));
		List<Double> revenueList = IntStream.rangeClosed(1, 12)
				.mapToObj(month -> revenueByMonth.getOrDefault(Month.of(month), 0.0)).collect(Collectors.toList());
		return revenueList;
	}

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
//	public List<Double> getListRevenue() {
//		List<TicketEntity> ticketEntities = ticketRepository.findAll();
//		List<TicketEntity> paidTickets = ticketEntities.stream().filter(TicketEntity::isPaid)
//				.collect(Collectors.toList());
//		Map<Month, Double> revenueByMonth = paidTickets.stream().filter(
//				ticket -> ticket.getScheduleEntity() != null && ticket.getScheduleEntity().getStartTime() != null) 
//				.collect(Collectors.groupingBy(ticket -> ticket.getScheduleEntity().getStartTime().getMonth(), 
//						Collectors.summingDouble(TicketEntity::getPrice)
//				));
//		List<Double> revenueList = IntStream.rangeClosed(1, 12)
//				.mapToObj(month -> revenueByMonth.getOrDefault(Month.of(month), 0.0)) 																	
//				.collect(Collectors.toList());
//
//		return revenueList;
//	}
}
