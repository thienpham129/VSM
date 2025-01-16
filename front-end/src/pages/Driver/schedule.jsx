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
import wating from "./waiting.webp";
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
  const [arrayTicketDoneFee, setArrayTicketDoneFee] = useState([]);
  const [currentLat, setCurrentLat] = useState("");
  const [currentLong, setCurrentLong] = useState("");
  const [checkDoubleRunningSchedule, setCheckDoubleRunningSchedule] =
    useState(false);
  const [idRunningSchedule, setIdRunningSchedule] = useState("");

  const [arrayTicketTemp, setArrayTicketTemp] = useState([]);
  const [arrayCorsPickUp, setArrayCorsPickUp] = useState([]);
  const [arrayCorsDrop, setArrayCorsDrop] = useState([]);

  const [firstDay, setFirstDay] = useState("");
  const [secondDay, setSecondDay] = useState("");
  const [thirdDay, setThirdDay] = useState("");

  const [dateDropDown, setDateDropDown] = useState("");

  const [startTimeSchedule, setStartTimeSchedule] = useState();
  const [toggleCancelModal, setToggleCancelModal] = useState(false);
  const [rowDataSchedulePopUp, setRowDataSchedulePopUp] = useState([]);

  const [isCalculatPathMapPickUp, setIsCalculatePathMapPickUp] =
    useState(false);
  const [arrayFakeAPI, setArrayFakeAPI] = useState([]);
  const [arrayFakeAPIDrop, setArrayFakeAPIDrop] = useState([]);
  const [matrixPickUp, setMatrixPickUp] = useState([]);
  const [matrixDrop, setMatrixDrop] = useState([]);
  const [resultShortestPathPickUp, setResultShortestPathPickUp] = useState("");
  const [resultShortestPathDrop, setResultShortestPathDrop] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexDrop, setCurrentIndexDrop] = useState(0);
  const [lengthMatrixPickup, setLengthMatrixPickUp] = useState(0);
  const [lengthMatrixDrop, setLengthMatrixDrop] = useState(0);
  const [isDonePathPickUp, setIsDonePathPickUp] = useState(false);
  const [isDonePathDrop, setIsDonePathDrop] = useState(false);
  const [hasShortestPathInDB, setHasShortestPathInDB] = useState(true);
  const [pickUpOrder, setPickUpOrder] = useState("");
  const [dropOrder, setDropOder] = useState("");
  // const [phase, setPhase] = useState(1);

  // const [checkRunningUpdatedStatus, setCheckRunningUpdatedStatus] =
  //   useState(false);
  // const [allDayDataSchedule, setAllDayDataSchedule] = useState([]);
  const columns = [
    {
      name: "Điểm Khởi Hành",
      selector: (row) => row.startLocation,
    },
    {
      name: "Điểm Đến",
      selector: (row) => row.stopLocation,
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
      name: "Loại Xe",
      selector: (row) => row.typeCarName,
    },
    {
      name: "Biển Số Xe",
      selector: (row) => row.plateNumber,
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
      width: "110px",
    },

    {
      name: "",
      selector: (row) => row.cancel,
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

  useEffect(() => {
    // if (dataSchedule.length > 0) {
    console.log(dataSchedule);
    changeDataSchedule();
    // }
  }, [dataSchedule]);

  useEffect(() => {
    if (dataScheduleDetail.length > 0) {
      changeDataScheduleDetail();
      let tempArrayInCar = [];
      let tempArrayNotInCar = [];
      let tempArrayDoneFee = [];
      let countNotInCar = 0;
      let tempArraydataScheduleDetail = [];
      let countWarningUpdate = 0;
      dataScheduleDetail.forEach((item, index) => {
        if (item.status.toLocaleUpperCase() === "ĐÃ LÊN XE") {
          countWarningUpdate += 1;
          // if (countWarningUpdate === 0) {
          setWarningUpdateSchedule(true);
          // }
          tempArrayInCar.push(item.fullName);
        } else if (item.status.toLocaleUpperCase() === "CHƯA LÊN XE") {
          countWarningUpdate += 1;
          // if (countWarningUpdate === 0) {
          setWarningUpdateSchedule(true);
          // }
          tempArrayNotInCar.push(item.fullName);
        } else if (item.status.toLocaleUpperCase() === "ĐÃ THANH TOÁN") {
          countWarningUpdate += 1;
          // if (countWarningUpdate === 0) {
          setWarningUpdateSchedule(true);
          // }
          tempArrayDoneFee.push(item.fullName);
        }

        if (item.mapStatus === "0") {
          countNotInCar += 1;
        }
      });
      // alert(countWarningUpdate);

      if (countWarningUpdate === 0) {
        setWarningUpdateSchedule(false);
      }

      setArrayTicketInCar(tempArrayInCar);
      setArrayTicketNotInCar(tempArrayNotInCar);
      setArrayTicketDoneFee(tempArrayDoneFee);
    }
  }, [dataScheduleDetail]);

  useEffect(() => {
    changeDataSchedule();
    changeDataScheduleDetail();
  }, [isClickDetail]);

  const fetchDataSchedule = async () => {
    //http://localhost:8080/driver/driver-schedule?accountId=3
    // const url = `driver/schedules/${localStorage.getItem("userId")}`;
    // const date = new Date();
    // let day = date.getFullYear() + "-" + (+date.getMonth() + 1) + "-";
    // let dateTime = "";
    // if (date.getDate() < 10) {
    //   dateTime = "0" + date.getDate();
    // } else {
    //   dateTime = date.getDate();
    // }
    // day = day + dateTime;
    // const url = "driver/driver-schedule";
    const driverId = localStorage.getItem("userId");
    try {
      const response = await root.get(
        `/driver/driver-schedule?accountId=${driverId}`
      );
      if (response.status === 200) {
        const tempArraySchedule = response.data;
        let arraySchedule = [];
        for (let i = 0; i < tempArraySchedule.length; i++) {
          for (let j = i + 1; j < tempArraySchedule.length; j++) {
            const firstDate = new Date(tempArraySchedule[i].startTime);
            const secondDate = new Date(tempArraySchedule[j].startTime);
            if (firstDate > secondDate) {
              let temp = tempArraySchedule[i];
              tempArraySchedule[i] = tempArraySchedule[j];
              tempArraySchedule[j] = temp;
            }
          }
        }
        arraySchedule = tempArraySchedule.filter((item) => {
          return String(item.startTime.split("T")[0]) === String(dateDropDown);
        });
        setDataSchedule(arraySchedule);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataSchedule();
  }, [dateDropDown]);

  const fetchDataScheduleDetail = async (scheduleId) => {
    const url = "/public/ticket-with-schedule";
    console.log(idSchedule);
    try {
      const response = await root.get(`${url}/${idSchedule}`);
      // const response = await root.get(`${url}/${scheduleId}`);
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

  const checkAllowUpdateFunc = async (scheduleId) => {
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
      setWarningUpdateSchedule(false);
      console.log(error);
    }
  };

  const checkDoubleRunningScheduleFunc = async () => {
    // const url = `driver/schedules/${localStorage.getItem("userId")}`;
    // const date = new Date();
    // let day = date.getFullYear() + "-" + (+date.getMonth() + 1) + "-";
    // let dateTime = "";
    // if (date.getDate() < 10) {
    //   dateTime = "0" + date.getDate();
    // } else {
    //   dateTime = date.getDate();
    // }
    // day = day + dateTime;
    // const url = "driver/driver-schedule";
    const driverId = localStorage.getItem("userId");
    try {
      // const response = await root.post(url, {
      //   accountId: localStorage.getItem("userId"),
      //   day: day,
      // });
      const response = await root.get(
        `/driver/driver-schedule?accountId=${driverId}`
      );
      if (response.status === 200) {
        console.log(response.data);
        let countRunningSchedule = 0;
        response.data.forEach((item, index) => {
          if (item.status.toLocaleUpperCase() === "ĐANG CHẠY") {
            countRunningSchedule += 1;
          }
        });
        if (countRunningSchedule >= 1) {
          // alert("OK");
          setCheckDoubleRunningSchedule(true);
        }
      } else {
        console.log(
          "Something went wrong with schedule api getAllDayDataSchedule"
        );
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
        console.log(idSchedule + " idSchedule");
        try {
          const fetchUpdateStatusUser = async () => {
            const response = await root.put(`${url}/${ticketId}`, {
              status: statusUser,
            });
            console.log(response.data);
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

  // useEffect(() => {
  //   if (isSuccessUpdateUser) {
  //     console.log(statusUser);
  //     try {
  //       const updateStatusMap = async (status) => {
  //         const responseMap = await root.put(
  //           `/public/update-status-map/ticket/${ticketId}`,
  //           {
  //             mapStatus: status,
  //           }
  //         );
  //         if (!responseMap.data) {
  //           console.log(
  //             "Something went wrong with call api of updateStatusMap"
  //           );
  //         } else {
  //           setIsDoneUpdateMapStatus(true);
  //           setIsSuccessUpdateUser(false);
  //         }
  //       };
  //       if (statusUser.toLocaleUpperCase() === "ĐÃ LÊN XE") {
  //         updateStatusMap("1");
  //       } else if (statusUser.toLocaleUpperCase() === "CHƯA LÊN XE") {
  //         updateStatusMap("0");
  //       } else if (statusUser.toLocaleUpperCase() === "ĐÃ XUỐNG XE") {
  //         updateStatusMap("2");
  //       } else {
  //         updateStatusMap("3");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [isSuccessUpdateUser]);

  // useEffect(() => {
  //   if (dataScheduleDetail.length > 0 && isDoneUpdateMapStatus) {
  //     const findNextDestination = async () => {
  //       let countNotInCar = 0;
  //       let arrayNotIncarUser = [];
  //       let arrayIncarUser = [];
  //       dataScheduleDetail.forEach((item, index) => {
  //         if (
  //           item.status.toLocaleUpperCase().trim() === "CHƯA LÊN XE" ||
  //           item.status.toLocaleUpperCase().trim() === "ĐÃ THANH TOÁN"
  //         ) {
  //           countNotInCar += 1;
  //           arrayNotIncarUser.push(item);
  //         }

  //         if (item.status.toLocaleUpperCase().trim() === "ĐÃ LÊN XE") {
  //           arrayIncarUser.push(item);
  //         }
  //       });
  //       console.log(arrayNotIncarUser);
  //       console.log(arrayIncarUser);
  //       if (arrayIncarUser.length > 0 || arrayNotIncarUser.length > 0) {
  //         if (countNotInCar !== 0) {
  //           let oldPositionOfShortestDistance = 0;
  //           let destination = "";
  //           arrayNotIncarUser.forEach((item, index) => {
  //             if (index === arrayNotIncarUser.length - 1) {
  //               destination += item.mapPickUp;
  //             } else {
  //               destination += item.mapPickUp + "%7C";
  //             }
  //           });
  //           let elementsArray = [];
  //           if (currentLat && currentLong) {
  //             const responseMap = await fetch(
  //               `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
  //             );
  //             const data = await responseMap.json();
  //             elementsArray = data.rows[0].elements;
  //           }
  //           console.log(elementsArray);
  //           console.log(currentLat + "         " + currentLong);
  //           console.log(destination);
  //           let testArray = [];
  //           elementsArray.forEach((item, index) => {
  //             testArray.push(item.distance.value);
  //           });
  //           for (let i = 0; i < 1; i++) {
  //             for (let j = i + 1; j < testArray.length; j++) {
  //               if (testArray[i] > testArray[j]) {
  //                 oldPositionOfShortestDistance = j;
  //                 let temp = testArray[i];
  //                 testArray[i] = testArray[j];
  //                 testArray[j] = temp;
  //               }
  //             }
  //           }
  //           arrayNotIncarUser.forEach((item, index) => {
  //             if (oldPositionOfShortestDistance === index) {
  //               try {
  //                 const updateStatusMap = async () => {
  //                   const responseMap = await root.put(
  //                     `/public/update-status-map/ticket/${item.ticketId}`,
  //                     {
  //                       mapStatus: "5",
  //                     }
  //                   );
  //                   if (!responseMap.data) {
  //                     console.log(
  //                       "Something went wrong with call api of updateStatusMap"
  //                     );
  //                   }
  //                 };
  //                 updateStatusMap();
  //               } catch (error) {
  //                 console.log(error);
  //               }
  //             }
  //           });
  //         } else {
  //           let oldPositionOfShortestDistance = 0;
  //           let destination = "";
  //           arrayIncarUser.forEach((item, index) => {
  //             if (index === arrayIncarUser.length - 1) {
  //               destination += item.mapDrop;
  //             } else {
  //               destination += item.mapDrop + "%7C";
  //             }
  //           });
  //           let elementsArray = [];
  //           if (currentLat && currentLong) {
  //             const responseMap = await fetch(
  //               `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
  //             );
  //             const data = await responseMap.json();
  //             elementsArray = data.rows[0].elements;
  //           }
  //           console.log(elementsArray);
  //           console.log(currentLat + "         " + currentLong);
  //           console.log(destination);
  //           let testArray = [];
  //           elementsArray.forEach((item, index) => {
  //             testArray.push(item.distance.value);
  //           });
  //           for (let i = 0; i < 1; i++) {
  //             for (let j = i + 1; j < testArray.length; j++) {
  //               if (testArray[i] > testArray[j]) {
  //                 oldPositionOfShortestDistance = j;
  //                 let temp = testArray[i];
  //                 testArray[i] = testArray[j];
  //                 testArray[j] = temp;
  //               }
  //             }
  //           }
  //           arrayIncarUser.forEach((item, index) => {
  //             if (oldPositionOfShortestDistance === index) {
  //               try {
  //                 const updateStatusMap = async () => {
  //                   const responseMap = await root.put(
  //                     `/public/update-status-map/ticket/${item.ticketId}`,
  //                     {
  //                       mapStatus: "5",
  //                     }
  //                   );
  //                   if (!responseMap.data) {
  //                     console.log(
  //                       "Something went wrong with call api of updateStatusMap"
  //                     );
  //                   }
  //                 };
  //                 updateStatusMap();
  //               } catch (error) {
  //                 console.log(error);
  //               }
  //             }
  //           });
  //         }
  //       }
  //     };
  //     findNextDestination();
  //   }
  // }, [isDoneUpdateMapStatus, dataScheduleDetail]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLong(position.coords.longitude);
    });
  }, []);

  const getTicketByScheduleId = async () => {
    try {
      const response = await root.get(
        `/public/ticket-with-schedule/${scheduleIdByRow}`
      );
      if (response.status === 200) {
        const tempCorsPickUpArray = [];
        tempCorsPickUpArray.push(`${currentLat},${currentLong}`);
        const tempCorsDropArray = [];
        response.data.forEach((item) => {
          if (item.status.toLocaleUpperCase() !== "HỦY ĐẶT VÉ") {
            tempCorsPickUpArray.push(item.mapPickUp);
            tempCorsDropArray.push(item.mapDrop);
          }
        });
        // tempCorsDropArray.unshift(
        //   tempCorsPickUpArray[tempCorsPickUpArray.length - 1]
        // );
        console.log(tempCorsPickUpArray);
        setLengthMatrixPickUp(tempCorsPickUpArray.length);
        setLengthMatrixDrop(tempCorsDropArray.length + 1);
        setArrayCorsPickUp(tempCorsPickUpArray);
        setArrayCorsDrop(tempCorsDropArray);
      } else {
        console.log("Something went wrong with api getAllDayDataSchedule !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isCalculatPathMapPickUp && !hasShortestPathInDB) {
      const newArray = [];
      for (let i = 0; i < arrayCorsPickUp.length; i++) {
        let subDestination = "";
        for (let j = 0; j < arrayCorsPickUp.length; j++) {
          if (i !== j && j !== arrayCorsPickUp.length - 1) {
            subDestination += arrayCorsPickUp[j] + "%7C";
          }
          if (i !== j && j === arrayCorsPickUp.length - 1) {
            subDestination += arrayCorsPickUp[j];
          }
          if (
            i === arrayCorsPickUp.length - 1 &&
            j === arrayCorsPickUp.length - 1
          ) {
            subDestination = subDestination.slice(0, subDestination.length - 3);
          }
        }
        newArray.push({ start: arrayCorsPickUp[i], des: subDestination });
      }
      setArrayFakeAPI(newArray);
    }
  }, [arrayCorsPickUp, arrayCorsDrop]);

  const getDistance = async (start, destination, indexCurrent) => {
    if (isCalculatPathMapPickUp && !hasShortestPathInDB) {
      if (currentLat && currentLong) {
        let tempArrayDistance = [];
        try {
          const responseMap = await fetch(
            `https://rsapi.goong.io/DistanceMatrix?origins=${start}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
          );
          const data = await responseMap.json();
          // console.log(data);
          console.log(data.rows[0].elements);
          if (data.rows[0].elements) {
            data.rows[0].elements.forEach((item, index) => {
              tempArrayDistance.push(item.distance.value);
            });
            tempArrayDistance = [
              ...tempArrayDistance.slice(0, indexCurrent),
              0,
              ...tempArrayDistance.slice(indexCurrent),
            ];
          }
        } catch (error) {
          console.log(error);
        }

        if (tempArrayDistance.length > 0) {
          setMatrixPickUp((prevState) => {
            return [...prevState, tempArrayDistance];
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isCalculatPathMapPickUp && !hasShortestPathInDB) {
      if (arrayFakeAPI.length > 0) {
        const interval = setInterval(() => {
          getDistance(
            arrayFakeAPI[currentIndex].start,
            arrayFakeAPI[currentIndex].des,
            currentIndex
          );
          setCurrentIndex((prevIndex) => {
            if (prevIndex < arrayFakeAPI.length - 1) {
              return prevIndex + 1;
            } else {
              clearInterval(interval);
              return prevIndex;
            }
          });
        }, 1300);

        return () => clearInterval(interval);
      }
    }
  }, [arrayFakeAPI, currentIndex]);

  useEffect(() => {
    if (
      matrixPickUp.length === lengthMatrixPickup &&
      isCalculatPathMapPickUp &&
      !hasShortestPathInDB
    ) {
      // console.log(matrixPickUp);
      const result = [];
      result[0] = 0;
      const checkTraveled = [];
      let total = 0;
      let bestTotal = Number.MAX_VALUE;
      let bestResult = [];
      for (let i = 0; i < arrayCorsPickUp.length; i++) {
        checkTraveled[i] = false;
      }
      checkTraveled[0] = true;
      // console.log(checkTraveled);
      // console.log(arrayCorsPickUp);

      const update = () => {
        console.log(total);
        console.log(result);
        if (total < bestTotal) {
          console.log("OK   " + total);
          bestTotal = total;
          bestResult = [];
          for (let i = 0; i < result.length; i++) {
            bestResult.push(result[i]);
          }
          console.log(bestResult + "     best choice");
        }
      };

      const travel = (index) => {
        if (total > bestTotal) {
          return;
        }

        for (let i = 0; i < arrayCorsPickUp.length; i++) {
          if (!checkTraveled[i] && matrixPickUp[result[index - 1]][i] > 0) {
            result[index] = i;
            checkTraveled[i] = true;
            total += matrixPickUp[result[index - 1]][i];
            if (index === arrayCorsPickUp.length - 1) {
              update();
            } else {
              travel(index + 1);
            }

            total -= matrixPickUp[result[index - 1]][i];
            checkTraveled[i] = false;
          }
        }
      };

      travel(1);

      // console.log(bestResult);
      // console.log(bestTotal);
      bestResult.shift();
      // let finalResult = [];
      let tempOrderPickUp = "";
      let tempFinalResult = "";
      bestResult.forEach((item, index) => {
        if (index === bestResult.length - 1) {
          tempFinalResult += arrayCorsPickUp[item];
          tempOrderPickUp += item;
          setArrayCorsDrop((prevState) => {
            return [arrayCorsPickUp[item], ...prevState];
          });
        } else {
          tempFinalResult += arrayCorsPickUp[item] + ";";
          tempOrderPickUp += item + ",";
        }
      });
      // bestResult.forEach((item) => {
      //   finalResult.push(item - 1);
      // });
      tempFinalResult = tempFinalResult + "!" + tempOrderPickUp;

      setResultShortestPathPickUp(tempFinalResult);
      setIsDonePathPickUp(true);
      console.log("---------Done Pick UP Path----------");
      // console.log(finalResult);
      console.log(bestTotal);
      console.log(tempFinalResult);
    }
  }, [matrixPickUp]);

  useEffect(() => {
    if (isDonePathPickUp && !hasShortestPathInDB) {
      const newArray = [];
      for (let i = 0; i < arrayCorsDrop.length; i++) {
        let subDestination = "";
        for (let j = 0; j < arrayCorsDrop.length; j++) {
          if (i !== j && j !== arrayCorsDrop.length - 1) {
            subDestination += arrayCorsDrop[j] + "%7C";
          }
          if (i !== j && j === arrayCorsDrop.length - 1) {
            subDestination += arrayCorsDrop[j];
          }
          if (
            i === arrayCorsDrop.length - 1 &&
            j === arrayCorsDrop.length - 1
          ) {
            subDestination = subDestination.slice(0, subDestination.length - 3);
          }
        }
        newArray.push({ start: arrayCorsDrop[i], des: subDestination });
      }
      setArrayFakeAPIDrop(newArray);
    }
  }, [isDonePathPickUp]);

  const getDistanceDrop = async (start, destination, indexCurrent) => {
    if (isDonePathPickUp && !hasShortestPathInDB) {
      // if (currentLat && currentLong) {
      let tempArrayDistance = [];
      try {
        const responseMap = await fetch(
          `https://rsapi.goong.io/DistanceMatrix?origins=${start}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
        );
        const data = await responseMap.json();
        // console.log(data);
        console.log(data.rows[0].elements);
        if (data.rows[0].elements) {
          data.rows[0].elements.forEach((item, index) => {
            tempArrayDistance.push(item.distance.value);
          });
          tempArrayDistance = [
            ...tempArrayDistance.slice(0, indexCurrent),
            0,
            ...tempArrayDistance.slice(indexCurrent),
          ];
        }
      } catch (error) {
        console.log(error);
      }

      if (tempArrayDistance.length > 0) {
        setMatrixDrop((prevState) => {
          return [...prevState, tempArrayDistance];
        });
      }
      // }
    }
  };

  useEffect(() => {
    if (isDonePathPickUp && !hasShortestPathInDB) {
      if (arrayFakeAPIDrop.length > 0) {
        const interval = setInterval(() => {
          getDistanceDrop(
            arrayFakeAPIDrop[currentIndexDrop].start,
            arrayFakeAPIDrop[currentIndexDrop].des,
            currentIndexDrop
          );
          setCurrentIndexDrop((prevIndex) => {
            if (prevIndex < arrayFakeAPIDrop.length - 1) {
              return prevIndex + 1;
            } else {
              clearInterval(interval);
              return prevIndex;
            }
          });
        }, 1300);

        return () => clearInterval(interval);
      }
    }
  }, [arrayFakeAPIDrop, currentIndexDrop]);

  useEffect(() => {
    if (
      matrixDrop.length === lengthMatrixDrop &&
      isDonePathPickUp &&
      !hasShortestPathInDB
    ) {
      // console.log(matrixPickUp);
      const result = [];
      result[0] = 0;
      const checkTraveled = [];
      let total = 0;
      let bestTotal = Number.MAX_VALUE;
      let bestResult = [];
      for (let i = 0; i < arrayCorsDrop.length; i++) {
        checkTraveled[i] = false;
      }
      checkTraveled[0] = true;
      // console.log(checkTraveled);
      // console.log(arrayCorsPickUp);

      const update = () => {
        console.log(total);
        console.log(result);
        if (total < bestTotal) {
          console.log("OK   " + total);
          bestTotal = total;
          bestResult = [];
          for (let i = 0; i < result.length; i++) {
            bestResult.push(result[i]);
          }
          console.log(bestResult + "     best choice");
        }
      };

      const travel = (index) => {
        if (total > bestTotal) {
          return;
        }

        for (let i = 0; i < arrayCorsDrop.length; i++) {
          if (!checkTraveled[i] && matrixDrop[result[index - 1]][i] > 0) {
            result[index] = i;
            checkTraveled[i] = true;
            total += matrixDrop[result[index - 1]][i];
            if (index === arrayCorsDrop.length - 1) {
              update();
            } else {
              travel(index + 1);
            }

            total -= matrixDrop[result[index - 1]][i];
            checkTraveled[i] = false;
          }
        }
      };

      travel(1);

      // console.log(bestResult);
      // console.log(bestTotal);
      // bestResult.shift();
      // let finalResult = [];
      // bestResult.forEach((item) => {
      //   finalResult.push(item - 1);
      // });
      // setResultShortestPathDrop(finalResult);
      // setIsDonePathPickUp(true);
      let tempFinalResult = "";
      let tempOrderDrop = "";
      bestResult.forEach((item, index) => {
        if (index === 0) {
          tempFinalResult += arrayCorsDrop[item] + "/";
        } else {
          if (index === bestResult.length - 1) {
            tempFinalResult += arrayCorsDrop[item];
            tempOrderDrop += item;
          } else {
            tempFinalResult += arrayCorsDrop[item] + ";";
            tempOrderDrop += item + ",";
          }
        }
      });
      tempFinalResult = tempFinalResult + "!" + tempOrderDrop;

      setResultShortestPathDrop(tempFinalResult);
      setIsDonePathDrop(true);
      console.log("---------Done Drop Off Path----------");
      // console.log(finalResult);
      console.log(bestTotal);
      console.log(tempFinalResult);
    }
  }, [matrixDrop]);

  useEffect(() => {
    if (
      isDonePathDrop &&
      resultShortestPathDrop &&
      resultShortestPathPickUp &&
      !hasShortestPathInDB
    ) {
      try {
        const saveAllPathToDB = async () => {
          const response = await root.post("/driver/move-order", {
            pickupOrder: resultShortestPathPickUp,
            dropoffOrder: resultShortestPathDrop,
            scheduleId: scheduleIdByRow,
          });
          console.log(response);
        };
        saveAllPathToDB();

        //   const [isCalculatPathMapPickUp, setIsCalculatePathMapPickUp] =
        //   useState(false);
        // const [arrayFakeAPI, setArrayFakeAPI] = useState([]);
        // const [arrayFakeAPIDrop, setArrayFakeAPIDrop] = useState([]);
        // const [matrixPickUp, setMatrixPickUp] = useState([]);
        // const [matrixDrop, setMatrixDrop] = useState([]);
        // const [resultShortestPathPickUp, setResultShortestPathPickUp] = useState("");
        // const [resultShortestPathDrop, setResultShortestPathDrop] = useState("");
        // const [currentIndex, setCurrentIndex] = useState(0);
        // const [currentIndexDrop, setCurrentIndexDrop] = useState(0);
        // const [lengthMatrixPickup, setLengthMatrixPickUp] = useState(0);
        // const [lengthMatrixDrop, setLengthMatrixDrop] = useState(0);
        // const [isDonePathPickUp, setIsDonePathPickUp] = useState(false);
        // const [isDonePathDrop, setIsDonePathDrop] = useState(false);
        // const [hasShortestPathInDB, setHasShortestPathInDB] = useState(true);
        setIsCalculatePathMapPickUp(false);
        setArrayFakeAPI([]);
        setArrayFakeAPIDrop([]);
        setMatrixPickUp([]);
        setMatrixDrop([]);
        setResultShortestPathPickUp("");
        setResultShortestPathDrop("");
        setCurrentIndex(0);
        setCurrentIndexDrop(0);
        setLengthMatrixPickUp(0);
        setLengthMatrixDrop(0);
        setIsDonePathPickUp(false);
        setIsDonePathDrop(false);
        setHasShortestPathInDB(true);
        setArrayCorsPickUp([]);
        setArrayCorsDrop([]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isDonePathDrop]);

  const handleUpdateSchedule = async () => {
    if (updateAnyWay) {
      const url = "driver/update-status-schedule";
      try {
        // const response = await root.put(url, {
        //   status: statusSchedule,
        //   schduleId: scheduleIdByRow,
        // });
        const response = await root.put(
          `${url}?scheduleId=${scheduleIdByRow}&status=${statusSchedule}`
        );
        if (response.status === 200) {
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
        const currentDate = new Date();
        const targetDate = new Date(startTimeSchedule);
        if (
          ~~(targetDate.getTime() / 60000) >= ~~(currentDate.getTime() / 60000)
        ) {
          console.log(date.getHours() + date.getMinutes() / 60);
          console.log(+startHourSchedule);
          notifyErrorUpdateSchedule();
        } else {
          // alert(warningUpdateSchedule);
          if (
            !warningUpdateSchedule ||
            statusSchedule.toLocaleUpperCase() !== "ĐÃ HOÀN THÀNH"
          ) {
            if (
              !checkDoubleRunningSchedule ||
              statusSchedule.toLocaleUpperCase() !== "ĐANG CHẠY"
            ) {
              const url = "driver/update-status-schedule";
              try {
                // const response = await root.put(url, {
                //   status: statusSchedule,
                //   schduleId: scheduleIdByRow,
                // });
                const response = await root.put(
                  `${url}?scheduleId=${scheduleIdByRow}&status=${statusSchedule}`
                );
                console.log(response);
                if (response.status === 200) {
                  fetchDataSchedule();
                  setCheckDoubleRunningSchedule(false);
                  if (statusSchedule.toLocaleUpperCase() === "ĐANG CHẠY") {
                    try {
                      const responseMoveOrder = await root.get(
                        `/driver/move-order-schedule/${scheduleIdByRow}`
                      );
                      if (responseMoveOrder.status === 200) {
                        setHasShortestPathInDB(true);
                        console.log("OK 123");
                      }
                    } catch (error) {
                      if (error.status === 404) {
                        try {
                          const responseTicket = await root.get(
                            `/public/ticket-with-schedule/${scheduleIdByRow}`
                          );
                          if (responseTicket.status === 200) {
                            let count = 0;
                            responseTicket.data.forEach((item) => {
                              if (
                                item.status.toLocaleUpperCase() !== "HỦY ĐẶT VÉ"
                              ) {
                                count += 1;
                              }
                            });
                            if (count > 0) {
                              getTicketByScheduleId();
                              setHasShortestPathInDB(false);
                              setIsCalculatePathMapPickUp(true);
                            }
                            console.log(responseTicket);
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      console.log(error);
                    }
                  }
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
              notifyErrorDoubleRunning();
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

  // useEffect(() => {
  //   if (checkRunningUpdatedStatus) {
  //     getAllDayDataSchedule();
  //   }
  // }, [checkRunningUpdatedStatus])

  const handleCancelSchedule = async () => {
    const currentDate = new Date();
    const targetDate = new Date(startTimeSchedule.toString());
    const twentyFourHoursInMin = 24 * 60;
    if (
      ~~(targetDate.getTime() / 60000 - twentyFourHoursInMin) >=
      ~~(currentDate.getTime() / 60000)
    ) {
      // alert("OK");
      try {
        const response = await root.put(
          `driver/update-remove-schedule?scheduleId=${scheduleIdByRow}`
        );
        if (response.status === 200) {
          console.log(response);
          setToggleCancelModal(false);
          notifyCancelScheduleSuccess();
          fetchDataSchedule();
        } else {
          console.log("Something went worng with api handleCancelSchedule");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyErrorCancelSchedule();
    }
  };

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

  const showPopUpDetailDataSchedule = (rowData) => {
    setStatusUSer("");
    setStatusSchedule("");
    let count = 1;
    let rowDataArray = [];
    rowData.childNodes.forEach((item, index) => {
      if (count <= 6) {
        rowDataArray.push(item.innerText);
        count += 1;
      } else {
        return;
      }
    });
    setRowDataSchedulePopUp(rowDataArray);
  };

  const changeDataSchedule = () => {
    const tempArray = dataSchedule.map((item, index) => {
      const currentDate = new Date();
      const targetDate = new Date(item.startTime.toString());
      const twentyFourHoursInMin = 24 * 60;
      let isDisplayCancelBtn = false;
      if (
        ~~(targetDate.getTime() / 60000 - twentyFourHoursInMin) >=
        ~~(currentDate.getTime() / 60000)
      ) {
        isDisplayCancelBtn = true;
      } else {
        isDisplayCancelBtn = false;
      }
      return {
        ...item,
        detail: (
          <Button
            style={{ width: "75px", fontSize: "9px" }}
            variant="contained"
            onClick={(e) => {
              setDataScheduleDetail([]);
              setIdSchedule(item.id);
              fetchDataScheduleDetail(item.id);
              CheckIsScheduleComplete(item.id);
              setCheckDoubleRunningSchedule(false);
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
              checkAllowUpdateFunc(item.id);
              checkDoubleRunningScheduleFunc();
              getStartHourByScheduleRow(item.id);
              setScheduleIdByRow(item.id);
              setStartTimeSchedule(item.startTime);
              navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLat(position.coords.latitude);
                setCurrentLong(position.coords.longitude);
              });
            }}
            disabled={item.status.toLocaleUpperCase() === "ĐÃ HOÀN THÀNH"}
          >
            Cập Nhật
          </Button>
        ),

        cancel: isDisplayCancelBtn ? (
          <Button
            style={{ width: "75px", fontSize: "9px" }}
            variant="contained"
            onClick={(e) => {
              setScheduleIdByRow(item.id);
              setToggleCancelModal(true);
              showPopUpDetailDataSchedule(
                e.target.parentElement.parentElement.parentElement
              );
              setStartTimeSchedule(item.startTime);
              // handleCancelSchedule(item.startTime, item.id);
            }}
            // disabled={item.status.toLocaleUpperCase() === "ĐÃ HOÀN THÀNH"}
          >
            Hủy Chuyến
          </Button>
        ) : (
          ""
        ),
      };
    });

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

  const notifyErrorDoubleRunning = () =>
    toast.error(
      "Không Thể Cập Nhật Trạng Thái Khi Có Hai Hoặc Nhiều Lịch Trình Đang Chạy!",
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

  const notifyErrorCancelSchedule = () =>
    toast.error("Không Thể Hủy Lịch Trình Sau 24 Giờ Thời Gian Khởi Hành !", {
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

  const notifyCancelScheduleSuccess = () =>
    toast.success("Hủy Lịch Trình Thành Công", {
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

  useEffect(() => {
    if (currentLat && currentLong) {
      const getScheduleByID = async () => {
        const url = "/public/ticket-with-schedule/2";
        try {
          const response = await root.get(url);
          if (response.data) {
            let currentCoordinate = "";
            currentCoordinate = `${currentLat},${currentLong}`;
            let tempArrayPickUp = [];
            tempArrayPickUp.push(currentCoordinate);
            let tempArrayDrop = [];
            response.data.forEach((item) => {
              tempArrayPickUp.push(item.mapPickUp);
              tempArrayDrop.push(item.mapDrop);
            });

            console.log(response.data);
            console.log(tempArrayPickUp);
            console.log(tempArrayDrop);
            setArrayCorsPickUp(tempArrayPickUp);
            setArrayCorsDrop(tempArrayDrop);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getScheduleByID();
    }
  }, [currentLat, currentLong]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayThree = new Date(today);
    dayThree.setDate(today.getDate() + 2);

    setFirstDay(
      today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0")
    );

    setSecondDay(
      tomorrow.getFullYear() +
        "-" +
        String(tomorrow.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(tomorrow.getDate()).padStart(2, "0")
    );

    setThirdDay(
      dayThree.getFullYear() +
        "-" +
        String(dayThree.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dayThree.getDate()).padStart(2, "0")
    );

    setDateDropDown(
      today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0")
    );
  }, []);

  return (
    <div className={styles.schdule}>
      {/* <button onClick={checkDate}>Generate Schedule Map</button> */}
      {isClickDetail ? (
        <div className="schedule_detail">
          <h1>Lịch Trình Cụ Thể </h1>
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => {
              setIdSchedule("");
              // setDataScheduleDetail([]);
              setIsComplete(false);
              setIsClickDetail(false);
              setCheckDoubleRunningSchedule(false);
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
          <FormControl style={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">
              Lịch Trình Trong Ngày
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dateDropDown}
              label="Lịch Trình Trong Ngày"
              onChange={(e) => {
                // setStatusUSer(e.target.value);
                setDateDropDown(e.target.value);
              }}
            >
              <MenuItem value={firstDay}>{firstDay}</MenuItem>
              <MenuItem value={secondDay}>{secondDay}</MenuItem>
              <MenuItem value={thirdDay}>{thirdDay}</MenuItem>
            </Select>
          </FormControl>
          <DataTable columns={columns} data={dataScheduleFinal}></DataTable>
          {isCalculatPathMapPickUp ? (
            <div className={styles.modal}>
              <div className={styles.overlay}></div>
              <div className={styles.modal_content}>
                <h3>
                  Hệ Thống Đang Tính Đường Đi Ngắn Nhất. Vui Lòng Chờ Trong Giây
                  Lát... !
                </h3>
                <img src={wating} alt="waiting" />
              </div>
            </div>
          ) : (
            ""
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
                      Loại Xe:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[3]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Biển Số Xe:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[4]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Trạng Thái:{" "}
                      <span className={styles.content_popup}>
                        {rowDataPopUp[5]}{" "}
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

                {arrayTicketDoneFee.map((item, index) => (
                  <ul>
                    <li>
                      <h4>
                        Hành Khách <span style={{ color: "red" }}>{item}</span>{" "}
                        vẫn đang ở trạng thái{" "}
                        <span style={{ color: "red" }}>Đã Thanh Toán</span>{" "}
                      </h4>
                    </li>
                  </ul>
                ))}
                <ul style={{ listStyle: "none" }}>
                  <li>
                    {/* <h4>Bạn Vẫn Muốn Cập Nhật Lịch Trình Này Chứ ?</h4> */}
                    <h4>
                      Hãy Cập Nhật Đúng Trạng Thái Của Khách Hàng Trước Khi Hoàn
                      Thành Chuyến Xe !
                    </h4>
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
                  {/* <Button
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
                  </Button> */}

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

          {toggleCancelModal ? (
            <div className={styles.modal}>
              <div
                className={styles.overlay}
                onClick={() => {
                  setToggleCancelModal(false);
                }}
              ></div>
              <div className={styles.modal_content}>
                <ul>
                  <li>
                    <h4>
                      Điểm Khởi Hành:{" "}
                      <span className={styles.content_popup}>
                        {rowDataSchedulePopUp[0]}{" "}
                      </span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Điểm Đến:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataSchedulePopUp[1]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Giờ Khởi Hành:{" "}
                      <span className={styles.content_popup}>
                        {rowDataSchedulePopUp[2]}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Loại Xe:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataSchedulePopUp[3]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Biển Số Xe:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataSchedulePopUp[4]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Trạng Thái:{" "}
                      <span className={styles.content_popup}>
                        {" "}
                        {rowDataSchedulePopUp[5]}{" "}
                      </span>{" "}
                    </h4>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <h4>Bạn Có Chắc Chắn Muốn Hủy Chạy Chuyến này Không ?</h4>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <Button
                      variant="contained"
                      style={{ fontSize: "11px" }}
                      onClick={(e) => {
                        handleCancelSchedule(e);
                      }}
                    >
                      Xác Nhận
                    </Button>
                  </li>
                </ul>

                <HighlightOffIcon
                  className={styles.close_modal}
                  onClick={() => {
                    setToggleCancelModal(false);
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
