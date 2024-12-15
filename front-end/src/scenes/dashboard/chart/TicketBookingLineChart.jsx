import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { request } from "admin/helpers/axios_helper";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TicketBookingLineChart = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await request("get", "/admin/dashboard/routes-tickets");
      setTickets(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tuyến đường:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Chuẩn bị dữ liệu từ tickets
  const datasets = tickets.map((ticket) => ({
    label: ticket.label,
    data: ticket.data,
    fill: false,
    borderColor: getRandomColor(), // Hàm để tạo màu ngẫu nhiên
    tension: 0.1,
    pointRadius: 5,
    pointBackgroundColor: getRandomColor(),
  }));

  // Dữ liệu biểu đồ
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
    datasets: datasets,
  };

  // Tùy chọn biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Số lần đặt vé theo tháng và tuyến đường",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Số vé: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lần đặt vé",
        },
      },
    },
  };

  // Hàm tạo màu ngẫu nhiên
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TicketBookingLineChart;
