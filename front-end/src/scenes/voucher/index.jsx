// import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { mockDataVoucher } from "../../admin/data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const VoucherAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Voucher ID", flex: 0.5 },
    { field: "code", headerName: "Code", flex: 1 },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => `${params.value * 100}%`,
    },
    {
      field: "valid",
      headerName: "Valid",
      type: "boolean",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <strong>{params.value ? "Yes" : "No"}</strong>,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Voucher" subtitle="Manage Voucher" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataVoucher}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default VoucherAdmin;
