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

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DriverPerformanceChart = () => {
  // Mock data
  const data = {
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
        label: "Tài xế A",
        data: [10, 12, 15, 8, 20, 14, 16, 19, 22, 25, 18, 20],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu cột
        borderColor: "rgba(75, 192, 192, 1)", // Viền cột
        borderWidth: 1,
      },
      {
        label: "Tài xế B",
        data: [8, 10, 12, 14, 18, 22, 24, 26, 28, 30, 25, 27],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Tài xế C",
        data: [5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Vị trí chú thích
        labels: {
          color: "#ffffff", // Màu chữ
        },
      },
      title: {
        display: true,
        text: "Số chuyến xe của tài xế trong 12 tháng",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Màu nhãn trục X
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Màu lưới trục X
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Màu nhãn trục Y
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Màu lưới trục Y
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", padding: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DriverPerformanceChart;
