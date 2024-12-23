import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { request } from "admin/helpers/axios_helper";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const RouteFrequencyPieChart = ({ data }) => {
  const [routes, setRoutes] = useState([]);

  const fetchRoutes = async () => {
    try {
      const response = await request("get", "/public/routes");
      const formattedRoutes = response.data.map(
        (route) => `${route.startLocation} → ${route.stopLocation}`
      );
      setRoutes(formattedRoutes);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tuyến đường:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const chartData = {
    labels: routes,
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
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} lượt`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
      {data.some((val) => val > 0) ? (
        <Pie data={chartData} options={options} />
      ) : (
        <Typography variant="h6" color="#ffffff" textAlign="center">
          Không có dữ liệu cho tháng này.
        </Typography>
      )}
    </div>
  );
};

export default RouteFrequencyPieChart;
