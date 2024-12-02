import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RouteFrequencyPieChart = ({ data }) => {
  // Dữ liệu biểu đồ
  const chartData = {
    labels: [
      "Huế → Đà Nẵng",
      "Đà Nẵng → Huế",
      "Huế → Hội An",
      "Đà Nẵng → Hội An",
    ],
    datasets: [
      {
        label: "Tần suất các tuyến đường",
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default RouteFrequencyPieChart;
