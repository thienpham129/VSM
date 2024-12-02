// RevenueChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Mock data doanh thu 12 tháng
  const mockData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (triệu đồng)",
        data: [50, 70, 80, 90, 100, 120, 150, 170, 140, 130, 160, 180],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Màu sắc cho các nhãn trong chú thích (legend)
        },
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu 12 tháng",
        color: "#ffffff", // Màu tiêu đề
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Màu nhãn trục X
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Màu lưới trục X
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Màu nhãn trục Y
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Màu lưới trục Y
        },
      },
    },
  };

  return <Bar data={mockData} options={options} />;
};

export default RevenueChart;
