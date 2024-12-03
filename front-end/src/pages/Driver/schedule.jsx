import React, { useEffect, useState } from "react";
// import { dataScheduleDetail } from "./dataScheduleDetail";
// import { dataSchedule } from "./dataSchedule";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
// import { NativeSelect } from "@mantine/core";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./schedule.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { root } from "helper/axiosClient";
function Schedule() {
  const navigate = useNavigate();
  const [isClickDetail, setIsClickDetail] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [rowDataPopUp, setRowDataPopUp] = useState([]);
  const [tempDataScheduleDetail, setTempDataScheduleDetail] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [statusUser, setStatusUSer] = useState("");
  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataScheduleDetail, setDataScheduleDetail] = useState([]);
  const [dataScheduleFinal, setDataScheduleFinal] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [idSchedule, setIdSchedule] = useState("");

  const columns = [
    {
      name: "Điểm Khởi Hành",
      selector: (row) => row.route.startLocation,
    },
    {
      name: "Điểm Đến",
      selector: (row) => row.route.stopLocation,
    },
    {
      name: "Giờ Khỏi Hành",
      selector: (row) => {
        return (
          row.startTime.split("T")[1] + " / " + row.startTime.split("T")[0]
        );
      },
    },
    {
      name: "",
      selector: (row) => row.action,
    },
  ];

  const columnsScheduleDetail = [
    {
      name: "Họ Và Tên",
      selector: (row) => <div title={row.fullName}> {row.fullName} </div>,
      width: "150px",
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phoneNumber,
      width: "130px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "230px",
    },
    {
      name: "Điểm Đón",
      selector: (row) => row.detailAddressToPickUp,
      width: "230px",
    },
    {
      name: "Điểm Trả",
      selector: (row) => row.detailAddressDropOff,
      width: "230px",
    },
    {
      name: "Chỗ Ngồi",
      selector: (row) => row.selectedSeat + " ",
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

  // useEffect(() => {
  //   if (dataSchedule.length > 0) {
  //     changeDataSchedule();
  //   }
  //   if (dataScheduleDetail.length > 0) {
  //     changeDataScheduleDetail();
  //   }
  // }, [isClickDetail]);

  useEffect(() => {
    if (dataSchedule.length > 0) {
      changeDataSchedule();
    }
  }, [dataSchedule]);

  useEffect(() => {
    if (dataScheduleDetail.length > 0) {
      changeDataScheduleDetail();
    }
  }, [dataScheduleDetail]);

  useEffect(() => {
    changeDataSchedule();
    changeDataScheduleDetail();
  }, [isClickDetail]);

  const fetchDataSchedule = async () => {
    // const url = `driver/schedules/${localStorage.getItem("userId")}`;
    const date = new Date();
    let day = date.getFullYear() + "-" + (+date.getMonth() + 1) + "-";
    let dateTime = "";
    if (date.getDate() < 10) {
      dateTime = "0" + date.getDate();
    } else {
      dateTime = date.getDate();
    }
    day = day + dateTime;
    console.log(day);
    const url = "driver/driver-schedule";
    try {
      const response = await root.post(url, {
        accountId: localStorage.getItem("userId"),
        day: day,
      });
      if (response) {
        setDataSchedule(response.data);
        console.log(response.data);
      }
    } catch (error) {}
  };

  const fetchDataScheduleDetail = async (scheduleId) => {
    const url = "/public/ticket-with-schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response) {
        setDataScheduleDetail(response.data);
        console.log(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataSchedule();
    fetchDataScheduleDetail();
  }, [isClickDetail]);

  // useEffect(() => {
  //   fetchDataSchedule();
  // }, []);

  const handleSearchName = (e) => {
    setValueInput(e.target.value);
    const tempArray = [];
    dataScheduleDetail.forEach((item, index) => {
      if (
        item.fullName
          .toLocaleUpperCase()
          .includes(e.target.value.toLocaleUpperCase())
      ) {
        tempArray.push(item);
      }
    });
    setTempDataScheduleDetail(tempArray);
  };

  const handleUpdate = () => {
    if (!statusUser) {
      notifyWarningUpdate();
    } else {
      const url = "/driver/update-status/ticket";
      try {
        const fetchUpdateStatusUser = async () => {
          const response = await root.put(`${url}/${ticketId}`, {
            status: statusUser,
          });
          if (response.data) {
            notifyScucessUpadte();
            setToggleModal(false);
            fetchDataScheduleDetail(idSchedule);
          } else {
            console.log(
              "Something went wrong with api of fetchUpdateStatusUser"
            );
          }
        };
        fetchUpdateStatusUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showPopUpDetailData = (rowData) => {
    setStatusUSer("");
    let count = 1;
    let rowDataArray = [];
    rowData.childNodes.forEach((item, index) => {
      if (count <= 7) {
        rowDataArray.push(item.innerText);
        count += 1;
      } else {
        return;
      }
    });
    setRowDataPopUp(rowDataArray);
  };

  const changeDataSchedule = () => {
    const tempArray = dataSchedule.map((item, index) => ({
      ...item,
      action: (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={(e) => {
            // navigate("/driver/schedule/*");
            // alert(item.id);
            setIdSchedule(item.id);
            fetchDataScheduleDetail(item.id);
            setIsClickDetail(true);
            // e.stopPropagation();
          }}
        >
          Xem Chi Tiết
        </Button>
      ),
    }));

    setDataScheduleFinal(tempArray);
    // dataSchedule.forEach((item, index) => {
    //   item.action = (
    //     <Button
    //       style={{ width: "75px", fontSize: "9px" }}
    //       variant="contained"
    //       onClick={(e) => {
    //         // navigate("/driver/schedule/*");
    //         setIsClickDetail(true);
    //         e.stopPropagation();
    //       }}
    //     >
    //       Xem Chi Tiết
    //     </Button>
    //   );
    // });
  };

  const changeDataScheduleDetail = () => {
    dataScheduleDetail.forEach((item, index) => {
      item.action = (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={(e) => {
            // handleUpdate(e);
            setToggleModal(true);
            showPopUpDetailData(
              e.target.parentElement.parentElement.parentElement
            );
            setTicketId(item.ticketId);
          }}
        >
          Cập Nhật
        </Button>
      );

      item.start_address = (
        <div title={item.start_address}>{item.start_address}</div>
      );
      item.phone = <div title={item.phone}>{item.phone}</div>;
      item.email = <div title={item.email}>{item.email}</div>;
      item.end_address = <div title={item.end_address}>{item.end_address}</div>;
    });
  };

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

  const notifyScucessUpadte = () =>
    toast.success("Cập Nhật Thành Công", {
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

  const notifyWarningUpdate = () =>
    toast.warn("Hãy Chọn Trạng Thái Khách Hàng Trước Khi Cập Nhật !", {
      position: "bottom-right",
      autoClose: 3000,
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
          <input
            type="text"
            placeholder="Tìm Kiếm Theo Tên"
            value={valueInput}
            style={{
              marginLeft: "77%",
              height: "35px",
              width: "200px",
              border: "1px solid grey",
              borderRadius: "15px",
            }}
            onChange={(e) => {
              handleSearchName(e);
            }}
          />
          {valueInput ? (
            <DataTable
              columns={columnsScheduleDetail}
              data={tempDataScheduleDetail}
            ></DataTable>
          ) : (
            <DataTable
              columns={columnsScheduleDetail}
              data={dataScheduleDetail}
              className="test"
            ></DataTable>
          )}

          {toggleModal ? (
            <div className={styles.modal}>
              <div
                className={styles.overlay}
                onClick={() => {
                  setToggleModal(false);
                }}
              ></div>
              <div className={styles.modal_content}>
                <ul>
                  <li>
                    <h4>
                      Họ Và Tên:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[0]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Số Điện Thoại:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataPopUp[1]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Email:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[2]}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Điểm Đón:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataPopUp[3]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Điểm Trả:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataPopUp[4]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Chỗ Ngồi:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataPopUp[5]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Trạng Thái:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataPopUp[6]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Trạng Thái
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusUser}
                        label="Trạng Thái"
                        onChange={(e) => {
                          setStatusUSer(e.target.value);
                        }}
                      >
                        <MenuItem value={"Đã Lên Xe"}>Đã Lên Xe</MenuItem>
                        <MenuItem value={"Chưa Lên Xe"}>Chưa Lên Xe</MenuItem>
                        <MenuItem value={"Đã Xuống Xe"}>Đã Xuống Xe</MenuItem>
                        <MenuItem value={"Hủy"}>Hủy</MenuItem>
                      </Select>
                    </FormControl>

                    <li className={styles.updateBtn_modal}>
                      <Button
                        variant="contained"
                        style={{ fontSize: "11px" }}
                        onClick={(e) => {
                          handleUpdate(e);
                          // if (statusUser) {
                          //   setToggleModal(false);
                          // }
                        }}
                      >
                        Cập Nhật
                      </Button>
                    </li>
                  </li>
                </ul>

                <HighlightOffIcon
                  className={styles.close_modal}
                  onClick={() => {
                    setToggleModal(false);
                  }}
                />
              </div>
            </div>
          ) : (
            ""
          )}

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
          {/* <DataTable columns={columns} data={dataScheduleFinal}></DataTable> */}
          <DataTable columns={columns} data={dataScheduleFinal}></DataTable>
        </div>
      )}
    </>
  );
}

export default Schedule;
