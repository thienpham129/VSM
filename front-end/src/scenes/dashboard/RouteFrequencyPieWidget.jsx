import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, FormControl } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import RouteFrequencyPieChart from "./chart/RouteFrequencyPieChart";

// Mock dữ liệu theo tháng
const mockData = {
  1: [30, 40, 20, 10], // Tháng 1
  2: [25, 35, 30, 10], // Tháng 2
  3: [20, 30, 40, 10], // Tháng 3
  12: [40, 30, 20, 10], // Tháng 12
};

const RouteFrequencyPieWidget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Lấy tháng hiện tại làm giá trị mặc định
  const currentMonth = new Date().getMonth() + 1;

  // State để lưu tháng được chọn
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Xử lý khi chọn tháng
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Lấy dữ liệu phù hợp với tháng được chọn
  const dataForSelectedMonth = mockData[selectedMonth] || [0, 0, 0, 0];

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
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Tần suất các tuyến đường
        </Typography>
        {/* Dropdown chọn tháng */}
        <FormControl
          sx={{
            minWidth: 120,
            backgroundColor: colors.primary[300],
            borderRadius: "4px",
          }}
        >
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            sx={{
              color: colors.grey[100],
              ".MuiSelect-icon": { color: colors.grey[100] },
            }}
          >
            {[...Array(12)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                Tháng {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Responsive Chart */}
      <Box
        flex="1"
        width="100%"
        minHeight="250px"
        height="100%"
        position="relative"
      >
        <RouteFrequencyPieChart data={dataForSelectedMonth} />
      </Box>
    </Box>
  );
};

export default RouteFrequencyPieWidget;
