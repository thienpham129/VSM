import React, { useEffect, useState } from "react";
import { dataScheduleDetail } from "./dataScheduleDetail";
import { dataSchedule } from "./dataSchedule";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Schedule() {
  const navigate = useNavigate();
  const [isClickDetail, setIsClickDetail] = useState(false);
  const [statusDetail, setStatusDetail] = useState("");
  const columns = [
    {
      name: "Điểm Khởi Hành",
      selector: (row) => row.start_location,
    },
    {
      name: "Điểm Đến",
      selector: (row) => row.end_location,
    },
    {
      name: "Giờ Khỏi Hành",
      selector: (row) => row.begin_time,
    },
    {
      name: "",
      selector: (row) => row.action,
    },
  ];

  const columnsScheduleDetail = [
    {
      name: "Họ Và Tên",
      selector: (row) => row.name,
      width: "200px",
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phone,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "250px",
    },
    {
      name: "Điểm Đón",
      selector: (row) => row.start_address,
      width: "200px",
    },
    {
      name: "Điểm Trả",
      selector: (row) => row.end_address,
      width: "200px",
    },
    {
      name: "Chỗ Ngồi",
      selector: (row) => row.seat_number,
      width: "100px",
    },
    {
      name: "Trạng Thái",
      selector: (row) => row.status,
      width: "150px",
    },
    {
      name: "",
      selector: (row) => row.action,
      width: "130px",
    },
  ];

  const changeDataSchedule = () => {
    dataSchedule.forEach((item, index) => {
      item.action = (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={() => {
            // navigate("/driver/schedule/*");
            setIsClickDetail(true);
          }}
        >
          Xem Chi Tiết
        </Button>
      );
    });
  };

  const changeDataScheduleDetail = () => {
    dataScheduleDetail.forEach((item, index) => {
      item.action = (
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Trạng Thái
          </InputLabel>
          <NativeSelect
            defaultValue={2}
            inputProps={{
              name: "status",
              id: "uncontrolled-native",
            }}
            style={{ fontSize: "10px" }}
          >
            <option value={1}>Đã Lên Xe</option>
            <option value={2}>Chưa Lên Xe</option>
            <option value={3}>Đã Trả</option>
          </NativeSelect>
        </FormControl>
      );
    });
  };
  useEffect(() => {
    changeDataSchedule();
    changeDataScheduleDetail();
  }, isClickDetail);

  const notifyScucessApply = () =>
    toast.success("Xác Nhận Thành Công", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const handleApply = () => {
    notifyScucessApply();
  };

  return (
    <>
      {isClickDetail ? (
        <div className="schedule_detail">
          <h1>Lịch Trình Cụ Thể </h1>
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => {
              setIsClickDetail(false);
            }}
          />
          <DataTable
            columns={columnsScheduleDetail}
            data={dataScheduleDetail}
            className="test"
          ></DataTable>
          <Button
            style={{
              width: "100px",
              height: "40px",
              fontSize: "11px",
            }}
            variant="contained"
            onClick={handleApply}
          >
            Xác Nhận
          </Button>

          <ToastContainer
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      ) : (
        <div className="schedule">
          <h1>Lịch Trình</h1>
          <DataTable columns={columns} data={dataSchedule}></DataTable>
        </div>
      )}
    </>
  );
}

export default Schedule;
