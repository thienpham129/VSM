import React from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import RevenueChart from "./chart/RevenueChart";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import DriverPerformanceChart from "./chart/DriverPerformanceChart";

const DriverPerformanceWidget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      gridColumn="span 12" // Make it span across the entire width on small screens
      gridRow="span 3"
      backgroundColor={colors.primary[400]}
      borderRadius="8px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      p="20px"
      gap="20px"
    >
      {/* Header */}
      {/* Uncomment the header part if needed */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Doanh Thu
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            $59,342.32
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <DownloadOutlinedIcon
              sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
          </IconButton>
        </Box>
      </Box> */}

      {/* Responsive Chart */}
      <Box
        flex="1"
        width="100%"
        minHeight="250px"
        height="100%"
        position="relative"
      >
        <DriverPerformanceChart />
      </Box>
    </Box>
  );
};

export default DriverPerformanceWidget;
