import React, { useState, useEffect } from "react";
import { dataParking } from "./dataParking";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";

function Parking() {
  const columns = [
    {
      name: "Tên Bãi Đỗ",
      selector: (row) => row.name,
    },
    {
      name: "Địa Điểm",
      selector: (row) => row.address,
    },
    {
      name: "Sức Chứa",
      selector: (row) => row.capacity,
    },
    {
      name: "Số Xe Đã Đỗ",
      selector: (row) => row.number_of_parked_cars,
    },
    {
      name: "Còn Trống",
      selector: (row) => row.empty,
    },
  ];
  return (
    <div>
      <h1>Bãi Đỗ Xe</h1>
      <DataTable columns={columns} data={dataParking} />
    </div>
  );
}

export default Parking;
