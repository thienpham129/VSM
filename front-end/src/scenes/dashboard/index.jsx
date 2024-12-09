import { Box, Button, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import RevenueWidget from "./RevenueWidget";
import DriverPerformanceChart from "./chart/DriverPerformanceChart";
import DriverPerformanceWidget from "./DriverPerformanceWidget";
import RouteFrequencyPieWidget from "./RouteFrequencyPieWidget";
import TicketBookingLineWidget from "./TicketBookingLineWidget";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Vé Xe"
            progress="0.75"
            increase="+14%"
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
            title="431,225"
            subtitle="Lịch Trình"
            progress="0.50"
            increase="+21%"
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
            title="32,441"
            subtitle="Người Dùng"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
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
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      <Grid container spacing={2} style={{ marginTop: "25px" }}>
        {/* ROW 1 */}
        <Grid item xs={12} md={8}>
          <RevenueWidget />
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
