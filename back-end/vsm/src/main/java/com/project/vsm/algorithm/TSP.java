package com.project.vsm.algorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class TSP {
	public static List<String> inputPoints(int n, Scanner scanner) {
		List<String> points = new ArrayList<>();
		for (int i = 0; i < n; i++) {
			System.out.print("Nhập tên điểm " + (i + 1) + ": ");
			points.add(scanner.nextLine());
		}
		return points;
	}

	// Hàm nhập ma trận khoảng cách giữa các điểm
	public static int[][] inputDistanceMatrix(int n, List<String> points, Scanner scanner) {
		int[][] dist = new int[n][n];
		System.out.println(
				"Nhập ma trận trọng số (trọng số giữa các điểm). Chỉ nhập 1 chiều, chương trình sẽ tự động gán chiều ngược lại.");
		for (int i = 0; i < n; i++) {
			for (int j = i + 1; j < n; j++) {
				System.out.print("Trọng số từ " + points.get(i) + " đến " + points.get(j) + ": ");
				dist[i][j] = scanner.nextInt();
				dist[j][i] = dist[i][j]; // Tự động gán chiều ngược lại
			}
		}
		return dist;
	}

	// Hàm tính toán đường đi ngắn nhất (TSP) và in ra đường đi
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
					if (mask == (1 << n) - 1 && v == startPoint) {
						dp[mask][v] = Math.min(dp[mask][v], dp[mask][u] + dist[u][v]);
						if (dp[mask][v] == dp[mask][u] + dist[u][v]) {
							parent[mask][v] = u;
						}
					} else if ((mask & (1 << v)) == 0) {
						int nextMask = mask | (1 << v);
						double newCost = dp[mask][u] + dist[u][v];
						if (newCost < dp[nextMask][v]) {
							dp[nextMask][v] = newCost;
							parent[nextMask][v] = u;
						}
					}
				}
			}
		}

		// Tìm chi phí tối thiểu khi quay lại điểm bắt đầu
		double minCost = Double.MAX_VALUE;
		int lastPoint = -1;
		for (int i = 0; i < n; i++) {
			if (i != startPoint && dp[(1 << n) - 1][i] + dist[i][startPoint] < minCost) {
				minCost = dp[(1 << n) - 1][i] + dist[i][startPoint];
				lastPoint = i;
			}
		}

		// Truy vết đường đi từ điểm bắt đầu đến điểm cuối cùng
		List<Integer> path = new ArrayList<>();
		int mask = (1 << n) - 1;
		while (lastPoint != startPoint) {
			path.add(lastPoint);
			int temp = lastPoint;
			lastPoint = parent[mask][lastPoint];
			mask ^= (1 << temp); // Loại bỏ điểm cuối cùng khỏi mask
		}
		path.add(startPoint);

		Collections.reverse(path);

		// In ra tên các điểm theo thứ tự
		printPath(path, points);
		return minCost;
	}

	// Hàm in đường đi theo tên
	public static void printPath(List<Integer> path, List<String> points) {
		System.out.print("Đường đi ngắn nhất (theo tên): ");
		for (int i = 0; i < path.size(); i++) {
			System.out.print(points.get(path.get(i)) + (i < path.size() - 1 ? " -> " : ""));
		}
		System.out.println();
	}

	// Hàm chính
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		// Nhập tổng số điểm
		System.out.print("Nhập tổng số điểm cần đi: ");
		int n = scanner.nextInt();
		scanner.nextLine(); // Đọc ký tự newline dư thừa

		// Nhập danh sách các điểm
		List<String> points = inputPoints(n, scanner);

		// Nhập ma trận khoảng cách
		int[][] dist = inputDistanceMatrix(n, points, scanner);

		// Nhập điểm bắt đầu
		System.out.print("Nhập điểm bắt đầu (1 đến " + n + "): ");
		int startPoint = scanner.nextInt() - 1; // Chuyển đổi từ 1-based index sang 0-based

		// Tính toán đường đi ngắn nhất
		double minCost = tsp(n, dist, startPoint, points);
		System.out.println("Chi phí tối thiểu: " + minCost);
	}
}
