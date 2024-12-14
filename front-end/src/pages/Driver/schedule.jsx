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
import { faL } from "@fortawesome/free-solid-svg-icons";
function Schedule() {
  const navigate = useNavigate();
  const [isClickDetail, setIsClickDetail] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalWarning, setToggleModalWarning] = useState(false);
  const [rowDataPopUp, setRowDataPopUp] = useState([]);
  const [tempDataScheduleDetail, setTempDataScheduleDetail] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [statusUser, setStatusUSer] = useState("");
  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataScheduleDetail, setDataScheduleDetail] = useState([]);
  const [dataScheduleFinal, setDataScheduleFinal] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [idSchedule, setIdSchedule] = useState("");
  const [statusSchedule, setStatusSchedule] = useState("");
  const [startHourSchedule, setStartHourSchedule] = useState("");
  const [scheduleIdByRow, setScheduleIdByRow] = useState("");
  const [warningUpdateSchedule, setWarningUpdateSchedule] = useState(false);
  const [arrayTicketInCar, setArrayTicketInCar] = useState([]);
  const [arrayTicketNotInCar, setArrayTicketNotInCar] = useState([]);
  const [updateAnyWay, SetUpdateAnyWay] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSuccessUpdateUser, setIsSuccessUpdateUser] = useState(false);
  const [isPickingUp, setIsPickingUp] = useState(true);
  const [isDoneUpdateMapStatus, setIsDoneUpdateMapStatus] = useState(false);
  const [currentLat, setCurrentLat] = useState("");
  const [currentLong, setCurrentLong] = useState("");

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
      name: "Trạng Thái",
      selector: (row) => row.status,
      width: "130px",
    },
    {
      name: "",
      selector: (row) => row.detail,
      width: "110px",
    },
    {
      name: "",
      selector: (row) => row.update,
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
      let tempArrayInCar = [];
      let tempArrayNotInCar = [];
      let countNotInCar = 0;
      let tempArraydataScheduleDetail = [];
      dataScheduleDetail.forEach((item, index) => {
        if (item.status.toLocaleUpperCase() === "ĐÃ LÊN XE") {
          setWarningUpdateSchedule(true);
          tempArrayInCar.push(item.fullName);
        }

        if (item.status.toLocaleUpperCase() === "CHƯA LÊN XE") {
          setWarningUpdateSchedule(true);
          tempArrayNotInCar.push(item.fullName);
        }

        if (item.status.toLocaleUpperCase() === "") {
        }
        if (item.mapStatus === "0") {
          countNotInCar += 1;
        }
      });

      setArrayTicketInCar(tempArrayInCar);
      setArrayTicketNotInCar(tempArrayNotInCar);
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
    const url = "driver/driver-schedule";
    try {
      const response = await root.post(url, {
        accountId: localStorage.getItem("userId"),
        day: day,
      });
      if (response) {
        setDataSchedule(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataScheduleDetail = async (scheduleId) => {
    const url = "/public/ticket-with-schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response.data) {
        let tempArrayScheduleDetail = [];
        response.data.forEach((item, index) => {
          if (item.status.toLocaleUpperCase() !== "HỦY ĐẶT VÉ") {
            tempArrayScheduleDetail.push(item);
          }
        });
        setDataScheduleDetail(tempArrayScheduleDetail);
        console.log(tempArrayScheduleDetail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CheckIsScheduleComplete = async (scheduleId) => {
    const url = "/public/schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response.data) {
        if (response.data.status.toLocaleUpperCase() === "ĐÃ HOÀN THÀNH") {
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
      } else {
        console.log(
          "Something went wrong with call api of CheckIsScheduleComplete"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //setStartHourSchedule(row.startTime.split("T")[1].split(":")[0]);

  const getStartHourByScheduleRow = async (scheduleId) => {
    const url = "/public/schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response.data) {
        setStartHourSchedule(
          +response.data.startTime.split("T")[1].split(":")[0] +
            +response.data.startTime.split("T")[1].split(":")[1] / 60
        );
      }
    } catch (error) {
      console.log(error);
    }
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
      const date = new Date();
      if (date.getHours() + date.getMinutes() / 60 < +startHourSchedule) {
        console.log(date.getHours() + date.getMinutes() / 60);
        console.log(+startHourSchedule);
        notifyErrorUpdateTicket();
      } else {
        const url = "/driver/update-status/ticket";
        try {
          const fetchUpdateStatusUser = async () => {
            const response = await root.put(`${url}/${ticketId}`, {
              status: statusUser,
            });
            if (response.data) {
              notifyScucessUpadte();
              setIsSuccessUpdateUser(true);
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
    }
  };

  useEffect(() => {
    if (isSuccessUpdateUser) {
      console.log(statusUser);
      try {
        const updateStatusMap = async (status) => {
          const responseMap = await root.put(
            `/public/update-status-map/ticket/${ticketId}`,
            {
              mapStatus: status,
            }
          );
          if (!responseMap.data) {
            console.log(
              "Something went wrong with call api of updateStatusMap"
            );
          } else {
            setIsDoneUpdateMapStatus(true);
            setIsSuccessUpdateUser(false);
          }
        };
        if (statusUser.toLocaleUpperCase() === "ĐÃ LÊN XE") {
          updateStatusMap("1");
        } else if (statusUser.toLocaleUpperCase() === "CHƯA LÊN XE") {
          updateStatusMap("0");
        } else if (statusUser.toLocaleUpperCase() === "ĐÃ XUỐNG XE") {
          updateStatusMap("2");
        } else {
          updateStatusMap("3");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isSuccessUpdateUser]);

  useEffect(() => {
    if (dataScheduleDetail.length > 0 && isDoneUpdateMapStatus) {
      const findNextDestination = async () => {
        let countNotInCar = 0;
        let arrayNotIncarUser = [];
        let arrayIncarUser = [];
        dataScheduleDetail.forEach((item, index) => {
          if (item.status.toLocaleUpperCase().trim() === "CHƯA LÊN XE") {
            countNotInCar += 1;
            arrayNotIncarUser.push(item);
          }

          if (item.status.toLocaleUpperCase().trim() === "ĐÃ LÊN XE") {
            arrayIncarUser.push(item);
          }
        });
        console.log(arrayNotIncarUser);
        console.log(arrayIncarUser);
        if (arrayIncarUser.length > 0 || arrayNotIncarUser.length > 0) {
          if (countNotInCar !== 0) {
            let oldPositionOfShortestDistance = 0;
            let destination = "";
            arrayNotIncarUser.forEach((item, index) => {
              if (index === arrayNotIncarUser.length - 1) {
                destination += item.mapPickUp;
              } else {
                destination += item.mapPickUp + "%7C";
              }
            });
            let elementsArray = [];
            if (currentLat && currentLong) {
              const responseMap = await fetch(
                `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
              );
              const data = await responseMap.json();
              elementsArray = data.rows[0].elements;
            }
            console.log(elementsArray);
            console.log(currentLat + "         " + currentLong);
            console.log(destination);
            let testArray = [];
            elementsArray.forEach((item, index) => {
              testArray.push(item.distance.value);
            });
            for (let i = 0; i < 1; i++) {
              for (let j = i + 1; j < testArray.length; j++) {
                if (testArray[i] > testArray[j]) {
                  oldPositionOfShortestDistance = j;
                  let temp = testArray[i];
                  testArray[i] = testArray[j];
                  testArray[j] = temp;
                }
              }
            }
            arrayNotIncarUser.forEach((item, index) => {
              if (oldPositionOfShortestDistance === index) {
                try {
                  const updateStatusMap = async () => {
                    const responseMap = await root.put(
                      `/public/update-status-map/ticket/${item.ticketId}`,
                      {
                        mapStatus: "5",
                      }
                    );
                    if (!responseMap.data) {
                      console.log(
                        "Something went wrong with call api of updateStatusMap"
                      );
                    }
                  };
                  updateStatusMap();
                } catch (error) {
                  console.log(error);
                }
              }
            });
          } else {
            let oldPositionOfShortestDistance = 0;
            let destination = "";
            arrayIncarUser.forEach((item, index) => {
              if (index === arrayIncarUser.length - 1) {
                destination += item.mapDrop;
              } else {
                destination += item.mapDrop + "%7C";
              }
            });
            let elementsArray = [];
            if (currentLat && currentLong) {
              const responseMap = await fetch(
                `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
              );
              const data = await responseMap.json();
              elementsArray = data.rows[0].elements;
            }
            console.log(elementsArray);
            console.log(currentLat + "         " + currentLong);
            console.log(destination);
            let testArray = [];
            elementsArray.forEach((item, index) => {
              testArray.push(item.distance.value);
            });
            for (let i = 0; i < 1; i++) {
              for (let j = i + 1; j < testArray.length; j++) {
                if (testArray[i] > testArray[j]) {
                  oldPositionOfShortestDistance = j;
                  let temp = testArray[i];
                  testArray[i] = testArray[j];
                  testArray[j] = temp;
                }
              }
            }
            arrayIncarUser.forEach((item, index) => {
              if (oldPositionOfShortestDistance === index) {
                try {
                  const updateStatusMap = async () => {
                    const responseMap = await root.put(
                      `/public/update-status-map/ticket/${item.ticketId}`,
                      {
                        mapStatus: "5",
                      }
                    );
                    if (!responseMap.data) {
                      console.log(
                        "Something went wrong with call api of updateStatusMap"
                      );
                    }
                  };
                  updateStatusMap();
                } catch (error) {
                  console.log(error);
                }
              }
            });
          }
        }
      };
      findNextDestination();
    }
  }, [isDoneUpdateMapStatus, dataScheduleDetail]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLong(position.coords.longitude);
    });
  }, []);

  const handleUpdateSchedule = async () => {
    if (updateAnyWay) {
      const url = "driver/update-status-schedule";
      try {
        const response = await root.put(url, {
          status: statusSchedule,
          schduleId: scheduleIdByRow,
        });
        if (response.data) {
          fetchDataSchedule();
          SetUpdateAnyWay(false);
          notifyScucessUpadte();
        } else {
          console.log(
            "Something went wrong with call api of handleUpdateSchedule"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!statusSchedule) {
        notifyWarningUpdate();
      } else {
        const date = new Date();
        if (date.getHours() + date.getMinutes() / 60 < +startHourSchedule) {
          console.log(date.getHours() + date.getMinutes() / 60);
          console.log(+startHourSchedule);
          notifyErrorUpdateSchedule();
        } else {
          if (
            !warningUpdateSchedule ||
            statusSchedule.toLocaleUpperCase() !== "ĐÃ HOÀN THÀNH"
          ) {
            const url = "driver/update-status-schedule";
            try {
              const response = await root.put(url, {
                status: statusSchedule,
                schduleId: scheduleIdByRow,
              });
              if (response.data) {
                fetchDataSchedule();
                notifyScucessUpadte();
              } else {
                console.log(
                  "Something went wrong with call api of handleUpdateSchedule "
                );
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            setToggleModalWarning(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (updateAnyWay) {
      handleUpdateSchedule();
    }
  }, [updateAnyWay]);

  const showPopUpDetailData = (rowData) => {
    setStatusUSer("");
    setStatusSchedule("");
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
      detail: (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={(e) => {
            setIdSchedule(item.id);
            fetchDataScheduleDetail(item.id);
            CheckIsScheduleComplete(item.id);
            setIsClickDetail(true);
          }}
        >
          Xem Chi Tiết
        </Button>
      ),

      update: (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={(e) => {
            setToggleModal(true);
            showPopUpDetailData(
              e.target.parentElement.parentElement.parentElement
            );
            getStartHourByScheduleRow(item.id);
            setScheduleIdByRow(item.id);
          }}
          disabled={item.status.toLocaleUpperCase() === "ĐÃ HOÀN THÀNH"}
        >
          Cập Nhật
        </Button>
      ),
    }));

    setDataScheduleFinal(tempArray);
  };

  useEffect(() => {
    if (scheduleIdByRow) {
      fetchDataScheduleDetail(scheduleIdByRow);
    }
  }, [scheduleIdByRow]);

  const changeDataScheduleDetail = () => {
    dataScheduleDetail.forEach((item, index) => {
      item.action = (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          disabled={isComplete}
          onClick={(e) => {
            // handleUpdate(e);
            setToggleModal(true);
            showPopUpDetailData(
              e.target.parentElement.parentElement.parentElement
            );
            setTicketId(item.ticketId);
            getStartHourByScheduleRow(idSchedule);
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

  const notifyErrorUpdateSchedule = () =>
    toast.error(
      "Không Thể Cập Nhật Trạng Thái Của Lịch Trình Khi Chưa Tới Giờ!",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );

  const notifyErrorUpdateTicket = () =>
    toast.error("Không Thể Cập Nhật Trạng Thái Của Vé Khi Chưa Tới Giờ!", {
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
    <div className={styles.schdule}>
      {isClickDetail ? (
        <div className="schedule_detail">
          <h1>Lịch Trình Cụ Thể </h1>
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => {
              setDataScheduleDetail([]);
              setIsComplete(false);
              setIsClickDetail(false);
              setStartHourSchedule("");
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
                      Điểm Khởi Hành:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[0]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Điểm Đến:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[1]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Giờ Khởi Hành:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[2]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Trạng Thái:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[3]}{" "}
                      </span>
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
                        value={statusSchedule}
                        label="Trạng Thái"
                        onChange={(e) => {
                          setStatusSchedule(e.target.value);
                        }}
                      >
                        <MenuItem value={"Đã lên lịch"}>Đã lên lịch</MenuItem>
                        <MenuItem value={"Đang chạy"}>Đang chạy</MenuItem>
                        <MenuItem value={"Đã hoàn thành"}>
                          Đã hoàn thành
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <li className={styles.updateBtn_modal}>
                      <Button
                        variant="contained"
                        style={{ fontSize: "11px" }}
                        onClick={(e) => {
                          handleUpdateSchedule();
                          if (statusSchedule) {
                            setToggleModal(false);
                          }
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
          {toggleModalWarning &&
          statusSchedule.toLocaleUpperCase() === "ĐÃ HOÀN THÀNH" ? (
            <div className={styles.modal}>
              <div
                className={styles.overlay}
                onClick={() => {
                  setToggleModal(false);
                }}
              ></div>
              <div className={styles.modal_content}>
                {arrayTicketInCar.map((item, index) => (
                  <ul>
                    <li>
                      <h4>
                        Hành Khách <span style={{ color: "red" }}>{item}</span>{" "}
                        vẫn đang ở trạng thái{" "}
                        <span style={{ color: "red" }}>Đã Lên Xe</span>{" "}
                      </h4>
                    </li>
                  </ul>
                ))}

                {arrayTicketNotInCar.map((item, index) => (
                  <ul>
                    <li>
                      <h4>
                        Hành Khách <span style={{ color: "red" }}>{item}</span>{" "}
                        vẫn đang ở trạng thái{" "}
                        <span style={{ color: "red" }}>Chưa Lên Xe</span>{" "}
                      </h4>
                    </li>
                  </ul>
                ))}
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <h4>Bạn Vẫn Muốn Cập Nhật Lịch Trình Này Chứ ?</h4>
                  </li>
                </ul>

                <div
                  style={{
                    margin: "0 auto",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ fontSize: "11px", marginRight: "10px" }}
                    onClick={(e) => {
                      SetUpdateAnyWay(true);
                      if (statusSchedule) {
                        setToggleModal(false);
                        setToggleModalWarning(false);
                      }
                    }}
                  >
                    Cập Nhật
                  </Button>

                  <Button
                    variant="contained"
                    style={{ fontSize: "11px" }}
                    onClick={(e) => {
                      setToggleModal(false);
                      setToggleModalWarning(false);
                    }}
                  >
                    Hủy
                  </Button>
                </div>
                <HighlightOffIcon
                  className={styles.close_modal}
                  onClick={() => {
                    setToggleModal(false);
                    setToggleModalWarning(false);
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
      )}
    </div>
  );
}

export default Schedule;
