import React, { useEffect, useState } from "react";
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
import { request } from "admin/helpers/axios_helper";

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
  const [drivers, setDrivers] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Hàm lấy dữ liệu từ API
  const fetchDriver = async () => {
    try {
      const response = await request("get", "/admin/dashboard/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tài xế:", error);
    }
  };

  // Xử lý dữ liệu thành dạng biểu đồ
  useEffect(() => {
    if (drivers.length > 0) {
      const labels = [
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
      ];

      const datasets = drivers.map((driver) => ({
        label: driver.label, // Tên tài xế
        data: driver.data, // Số chuyến xe từng tháng
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.6)`, // Màu ngẫu nhiên
        borderColor: "rgba(75, 192, 192, 1)", // Viền cột
        borderWidth: 1,
      }));

      setChartData({ labels, datasets });
    }
  }, [drivers]);

  // Gọi API khi component được render
  useEffect(() => {
    fetchDriver();
  }, []);

  // Tùy chỉnh biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
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
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  // Hiển thị biểu đồ nếu dữ liệu đã được tải
  return (
    // <div style={{ width: "100%", height: "400px", padding: "20px" }}>
    <div style={{ width: "100%", padding: "20px" }}>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default DriverPerformanceChart;
