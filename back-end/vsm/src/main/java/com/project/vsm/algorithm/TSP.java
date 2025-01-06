package com.project.vsm.algorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class TSP {

	// Hàm thêm điểm mới
	public static void addPoint(List<String> points, int[][] dist, Scanner scanner) {
		System.out.print("Nhập tên điểm mới: ");
		String newPoint = scanner.nextLine();

		// Thêm điểm mới vào danh sách
		points.add(newPoint);
		int n = points.size();

		// Mở rộng ma trận khoảng cách
		int[][] newDist = new int[n][n];
		for (int i = 0; i < n - 1; i++) {
			System.arraycopy(dist[i], 0, newDist[i], 0, n - 1);
		}

		// Nhập khoảng cách từ điểm mới đến các điểm hiện có
		for (int i = 0; i < n - 1; i++) {
			System.out.print("Nhập khoảng cách từ " + newPoint + " đến " + points.get(i) + ": ");
			int distance = scanner.nextInt();
			scanner.nextLine(); // Đọc bỏ ký tự newline
			newDist[n - 1][i] = distance;
			newDist[i][n - 1] = distance; // Gán chiều ngược lại
		}

		// Gán ma trận mới vào biến dist
		for (int i = 0; i < n; i++) {
			System.arraycopy(newDist[i], 0, dist[i], 0, n);
		}
	}

	// Hàm tính toán TSP và in ra kết quả
	public static double tsp(int n, int[][] dist, int startPoint, List<String> points) {
		double[][] dp = new double[1 << n][n];
		int[][] parent = new int[1 << n][n];

		// Khởi tạo dp
		for (int i = 0; i < (1 << n); i++) {
			Arrays.fill(dp[i], Double.MAX_VALUE);
		}
		dp[1 << startPoint][startPoint] = 0;

		// Duyệt qua tất cả các trạng thái (mask) và các điểm
		for (int mask = 0; mask < (1 << n); mask++) {
			for (int u = 0; u < n; u++) {
				if ((mask & (1 << u)) == 0)
					continue;

				for (int v = 0; v < n; v++) {
					if ((mask & (1 << v)) != 0)
						continue;

					int nextMask = mask | (1 << v);
					double newCost = dp[mask][u] + dist[u][v];
					if (newCost < dp[nextMask][v]) {
						dp[nextMask][v] = newCost;
						parent[nextMask][v] = u;
					}
				}
			}
		}

		// Tìm chi phí tối thiểu khi quay lại điểm bắt đầu
		double minCost = Double.MAX_VALUE;
		int lastPoint = -1;
		for (int i = 0; i < n; i++) {
			if (i != startPoint) {
				double cost = dp[(1 << n) - 1][i] + dist[i][startPoint];
				if (cost < minCost) {
					minCost = cost;
					lastPoint = i;
				}
			}
		}

		// Truy vết đường đi từ điểm bắt đầu đến điểm cuối cùng
		List<Integer> path = new ArrayList<>();
		int mask = (1 << n) - 1;
		while (lastPoint != startPoint) {
			path.add(lastPoint);
			int temp = lastPoint;
			lastPoint = parent[mask][lastPoint];
			mask ^= (1 << temp);
		}
		path.add(startPoint);

		Collections.reverse(path);

		// In ra tên các điểm theo thứ tự
		printPath(path, points);
		return minCost;
	}

	// Hàm in đường đi theo tên
	public static void printPath(List<Integer> path, List<String> points) {
		System.out.print("Đường đi ngắn nhất: ");
		for (int i = 0; i < path.size(); i++) {
			System.out.print(points.get(path.get(i)) + (i < path.size() - 1 ? " -> " : ""));
		}
		System.out.println();
	}

	// Hàm chính
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		// Danh sách các điểm và ma trận khoảng cách
		List<String> points = new ArrayList<>();
		int[][] dist = new int[100][100]; // Giả sử tối đa 100 điểm

		// Nhập các điểm
		while (true) {
			System.out.print("Bạn có muốn nhập điểm mới không? (y/n): ");
			String choice = scanner.nextLine();
			if (choice.equalsIgnoreCase("y")) {
				addPoint(points, dist, scanner);
			} else {
				break;
			}
		}

		// Nhập điểm bắt đầu
		System.out.print("Nhập điểm bắt đầu (1 đến " + points.size() + "): ");
		int startPoint = scanner.nextInt() - 1; // Chuyển từ 1-based sang 0-based

		// Tính toán đường đi ngắn nhất
		double minCost = tsp(points.size(), dist, startPoint, points);
		System.out.println("Chi phí tối thiểu: " + minCost);

		scanner.close();
	}
}
