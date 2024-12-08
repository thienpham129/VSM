import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import RevenueChart from "./chart/RevenueChart";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { request } from "admin/helpers/axios_helper";

const RevenueWidget = (props) => {
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
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Tổng Doanh Thu Năm {new Date().getFullYear()}
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            {props.totalRevenue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <DownloadOutlinedIcon
              sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Responsive Chart */}
      <Box
        flex="1"
        width="100%"
        minHeight="250px"
        height="100%"
        position="relative"
      >
        <RevenueChart revenue={props.revenue} />
      </Box>
    </Box>
  );
};

export default RevenueWidget;
