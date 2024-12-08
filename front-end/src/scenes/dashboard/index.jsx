import { Box, Button, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaymentsIcon from "@mui/icons-material/Payments";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import RevenueWidget from "./RevenueWidget";
import DriverPerformanceWidget from "./DriverPerformanceWidget";
import RouteFrequencyPieWidget from "./RouteFrequencyPieWidget";
import TicketBookingLineWidget from "./TicketBookingLineWidget";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [revenue, setRevenue] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statRevenue, setStatRevenue] = useState(0);
  const [statTicket, setStatTicket] = useState(0);
  const [statSchedule, setStatSchedule] = useState(0);
  const [statAccount, setStatAccount] = useState(0);

  const fetchRevenues = async () => {
    try {
      const response = await request("get", "/admin/dashboard/revenues");
      setRevenue(response.data);
      const total = response.data.reduce((acc, curr) => acc + curr, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu 12 tháng:", error);
    }
  };
  useEffect(() => {
    fetchRevenues();
  }, []);
  const fetchStatsAccount = async () => {
    try {
      const response = await request("get", "/admin/dashboard/stat-account");
      setStatAccount(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu stats account:", error);
    }
  };
  useEffect(() => {
    fetchStatsAccount();
  }, []);
  const fetchStatsSchedule = async () => {
    try {
      const response = await request("get", "/admin/dashboard/stat-schedule");
      setStatSchedule(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu stats schedule:", error);
    }
  };
  useEffect(() => {
    fetchStatsSchedule();
  }, []);

  const fetchStatsTicket = async () => {
    try {
      const response = await request("get", "/admin/dashboard/stat-ticket");
      setStatTicket(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu stats ticket:", error);
    }
  };
  useEffect(() => {
    fetchStatsTicket();
  }, []);

  const fetchStatRevenue = async () => {
    try {
      const response = await request("get", "/admin/dashboard/stat-revenue");

      // Định dạng title thành VND
      const formattedTitle = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        // minimumFractionDigits: 2, // Đảm bảo có 2 chữ số thập phân
        // maximumFractionDigits: 2, // Đảm bảo có 2 chữ số thập phân
      }).format(response.data.title);

      // Cập nhật state với title đã được định dạng
      setStatRevenue({
        title: formattedTitle,
        increase: response.data.increase,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu 12 tháng:", error);
    }
  };
  useEffect(() => {
    fetchStatRevenue();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statRevenue.title}
            subtitle="Doanh Thu"
            progress="0.80"
            increase={statRevenue.increase}
            icon={
              <PaymentsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statTicket.title}
            subtitle="Vé Xe"
            progress="0.75"
            increase={statTicket.increase}
            icon={
              <ConfirmationNumberIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statSchedule.title}
            subtitle="Lịch Trình"
            progress="0.50"
            increase={statSchedule.increase}
            icon={
              <CalendarMonthIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statAccount.title}
            subtitle="Người Dùng"
            progress="0.30"
            increase={statAccount.increase}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      <Grid container spacing={2} style={{ marginTop: "25px" }}>
        {/* ROW 1 */}
        <Grid item xs={12} md={8}>
          <RevenueWidget totalRevenue={totalRevenue} revenue={revenue} />
        </Grid>

        <Grid item xs={12} md={4}>
          <RouteFrequencyPieWidget />
        </Grid>

        {/* ROW 2 */}
        <Grid item xs={12} md={8}>
          <DriverPerformanceWidget />
        </Grid>
        {/* ROW 3 */}
        <Grid item xs={12} md={8}>
          <TicketBookingLineWidget />
        </Grid>
        {/* ROW 2 */}
        {/* <Grid item xs={12} md={6}>
            <TicketsSoldChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <RouteMap />
          </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
