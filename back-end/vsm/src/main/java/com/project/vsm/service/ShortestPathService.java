package com.project.vsm.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.model.DistanceEntity;
import com.project.vsm.repository.DistanceRepository;

@Service
public class ShortestPathService {

	@Autowired
	private DistanceRepository distanceRepository;

	/**
	 * Tìm đường đi qua tất cả các điểm trong một Schedule.
	 *
	 * @param startPoint Điểm bắt đầu
	 * @param scheduleId ID của Schedule
	 * @return Mảng các điểm theo thứ tự từ điểm bắt đầu, đi qua tất cả các điểm
	 */
	public List<String> findPathThroughAllPoints(String startPoint, long scheduleId) {
		// Lấy danh sách khoảng cách từ bảng Distance theo scheduleId
		List<DistanceEntity> distances = distanceRepository.findByScheduleId(scheduleId);

		// Tạo một bản đồ đồ thị (graph) để lưu thông tin
		Map<String, Map<String, Integer>> graph = buildGraph(distances);

		// Thực hiện thuật toán để đi qua tất cả các điểm
		return traverseAllPoints(graph, startPoint);
	}

	/**
	 * Xây dựng đồ thị từ danh sách DistanceEntity
	 *
	 * @param distances Danh sách DistanceEntity
	 * @return Đồ thị dưới dạng Map
	 */
	private Map<String, Map<String, Integer>> buildGraph(List<DistanceEntity> distances) {
		Map<String, Map<String, Integer>> graph = new HashMap<>();

		for (DistanceEntity distance : distances) {
			graph.putIfAbsent(distance.getPoint1(), new HashMap<>());
			graph.putIfAbsent(distance.getPoint2(), new HashMap<>());

			// Thêm khoảng cách hai chiều
			graph.get(distance.getPoint1()).put(distance.getPoint2(), distance.getDistance());
			graph.get(distance.getPoint2()).put(distance.getPoint1(), distance.getDistance());
		}

		return graph;
	}

	/**
	 * Thuật toán để đi qua tất cả các điểm bắt đầu từ một điểm.
	 *
	 * @param graph      Đồ thị
	 * @param startPoint Điểm bắt đầu
	 * @return Mảng các điểm theo thứ tự đã đi qua
	 */
	private List<String> traverseAllPoints(Map<String, Map<String, Integer>> graph, String startPoint) {
		List<String> path = new ArrayList<>();
		Set<String> visited = new HashSet<>();

		// Bắt đầu từ điểm khởi đầu
		traverse(graph, startPoint, visited, path);

		return path;
	}

	/**
	 * Đệ quy để đi qua tất cả các điểm
	 *
	 * @param graph   Đồ thị
	 * @param current Điểm hiện tại
	 * @param visited Tập các điểm đã đi qua
	 * @param path    Danh sách điểm đã đi qua theo thứ tự
	 */
	private void traverse(Map<String, Map<String, Integer>> graph, String current, Set<String> visited,
			List<String> path) {
		// Đánh dấu điểm hiện tại là đã thăm
		visited.add(current);
		path.add(current);

		// Duyệt qua các điểm kề chưa được thăm
		for (String neighbor : graph.getOrDefault(current, Collections.emptyMap()).keySet()) {
			if (!visited.contains(neighbor)) {
				traverse(graph, neighbor, visited, path);
			}
		}
	}
}