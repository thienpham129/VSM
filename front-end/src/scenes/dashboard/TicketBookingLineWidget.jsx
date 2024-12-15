import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import TicketBookingLineChart from "./chart/TicketBookingLineChart";

// Mock dữ liệu theo tháng
const TicketBookingLineWidget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      gridColumn="span 8"
      gridRow="span 3"
      backgroundColor={colors.primary[400]}
      borderRadius="8px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      p="20px"
      gap="20px"
    >
      {/* Responsive Chart */}
      <Box
        flex="1"
        width="100%"
        minHeight="250px"
        height="100%"
        position="relative"
      >
        <TicketBookingLineChart />
      </Box>
    </Box>
  );
};

export default TicketBookingLineWidget;
