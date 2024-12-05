import React from "react";
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
  // Mock dữ liệu: số lần đặt vé theo tháng cho mỗi tuyến đường
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
        label: "Huế → Đà Nẵng",
        data: [50, 60, 70, 80, 90, 110, 120, 130, 140, 150, 160, 170],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Màu cho đường của tuyến này
        tension: 0.1,
        pointRadius: 5, // Kích thước điểm trên đường
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Màu điểm
      },
      {
        label: "Đà Nẵng → Huế",
        data: [30, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)", // Màu cho đường của tuyến này
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
      },
      {
        label: "Huế → Hội An",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)", // Màu cho đường của tuyến này
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
      },
      {
        label: "Đà Nẵng → Hội An",
        data: [40, 50, 60, 70, 80, 100, 120, 130, 140, 150, 160, 170],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)", // Màu cho đường của tuyến này
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

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

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TicketBookingLineChart;
