import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./schedule.module.css";
import { root } from "helper/axiosClient";
import { AltRoute } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function ScheduleNotAssignment() {
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
      width: "200px",
    },
    // {
    //   name: "",
    //   selector: (row) => row.update,
    // },
  ];

  const notifyUpdateSuccess = () =>
    toast.success("Xác Nhận Thành Công", {
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

  const [scheduleNotAssignment, setScheduleNotAssignment] = useState([]);
  const [scheduelNotAssignFinal, setScheduleNotAssignFinal] = useState([]);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [toggleCancelModal, setToggleCancelModal] = useState(false);
  const [rowDataPopUp, setRowDataPopUp] = useState([]);
  const [scheduleIdByRow, setScheduleIdByRow] = useState("");

  const getScheduleNotAssignment = async () => {
    const url = "/public/empty-schedule";
    try {
      const response = await root.get(url);
      if (response.data) {
        let tempScheduleArray = [];
        const currentDate = new Date();
        response.data.forEach((item) => {
          const targetDate = new Date(item.startTime);
          if (
            ~~(targetDate.getTime() / 60000) >=
            ~~(currentDate.getTime() / 60000)
          ) {
            tempScheduleArray.push(item);
          }
        });

        for (let i = 0; i < tempScheduleArray.length; i++) {
          for (let j = i + 1; j < tempScheduleArray.length; j++) {
            const firstDate = new Date(tempScheduleArray[i].startTime);
            const secondDate = new Date(tempScheduleArray[j].startTime);
            if (firstDate > secondDate) {
              let temp = tempScheduleArray[i];
              tempScheduleArray[i] = tempScheduleArray[j];
              tempScheduleArray[j] = temp;
            }
          }
        }
        // setScheduleNotAssignment(response.data);
        setScheduleNotAssignment(tempScheduleArray);
      } else {
        console.log("Something went wrong with api getScheduleNotAssignment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getScheduleNotAssignment();
  }, []);

  const showPopUpDetailData = (rowData) => {
    console.log(rowData);
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
    setRowDataPopUp(rowDataArray);
  };

  const changeDataScheduleNotAssignmnet = () => {
    const tempArray = scheduleNotAssignment.map((item, index) => ({
      ...item,
      detail: (
        <Button
          style={{ width: "75px", fontSize: "9px" }}
          variant="contained"
          onClick={(e) => {
            setToggleConfirmModal(true);
            setScheduleIdByRow(item.id);
            showPopUpDetailData(
              e.target.parentElement.parentElement.parentElement
            );
          }}
        >
          Xác Nhận
        </Button>
      ),
      // update: (
      //   <Button
      //     style={{ width: "75px", fontSize: "9px" }}
      //     variant="contained"
      //     onClick={(e) => {
      //       setToggleCancelModal(true);
      //     }}
      //   >
      //     Hủy
      //   </Button>
      // ),
    }));
    setScheduleNotAssignFinal(tempArray);
  };

  useEffect(() => {
    if (scheduleNotAssignment.length > 0) {
      changeDataScheduleNotAssignmnet();
    }
  }, [scheduleNotAssignment]);

  const handleUpdate = () => {
    //http://localhost:8080/driver/update-schedule-account?scheduleId=9&accountId=1
    const driverId = localStorage.getItem("userId");
    const updateScheduleAccount = async () => {
      try {
        const response = await root.put(
          `/driver/update-schedule-account?scheduleId=${scheduleIdByRow}&accountId=${driverId}`
        );
        if (response.status === 200) {
          notifyUpdateSuccess();
          setToggleConfirmModal(false);
          getScheduleNotAssignment();
        } else {
          console.log("Something went wrong with api updateScheduleAccount");
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateScheduleAccount();
  };

  const handleCancel = () => {
    //Write Code To Cancel Schedule Here
  };
  return (
    <div>
      <h1>Lịch Trình Chưa Phân Công</h1>
      {scheduleNotAssignment.length > 0 ? (
        <DataTable columns={columns} data={scheduelNotAssignFinal}></DataTable>
      ) : (
        <h3 style={{ color: "red" }}>
          Không Có Lịch Trình Chưa Được Phân Công Ở Thời Điểm Hiện Tại !
        </h3>
      )}
      {toggleConfirmModal ? (
        <div className={styles.modal}>
          <div
            className={styles.overlay}
            onClick={() => {
              setToggleConfirmModal(false);
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
                    {" "}
                    {rowDataPopUp[1]}{" "}
                  </span>{" "}
                </h4>
              </li>
              <li>
                <h4>
                  Giờ Khởi Hành:{" "}
                  <span className={styles.content_popup}>
                    {rowDataPopUp[2]}
                  </span>{" "}
                </h4>
              </li>
              <li>
                <h4>
                  Loại Xe:{" "}
                  <span className={styles.content_popup}>
                    {" "}
                    {rowDataPopUp[3]}{" "}
                  </span>{" "}
                </h4>
              </li>
              <li>
                <h4>
                  Biển Số Xe:{" "}
                  <span className={styles.content_popup}>
                    {" "}
                    {rowDataPopUp[4]}{" "}
                  </span>{" "}
                </h4>
              </li>
              <li>
                <h4>
                  Trạng Thái:{" "}
                  <span className={styles.content_popup}>
                    {" "}
                    {rowDataPopUp[5]}{" "}
                  </span>{" "}
                </h4>
              </li>
              <li style={{ listStyle: "none" }}>
                <h4>Bạn Có Chắc Chắn Muốn Chạy Chuyến này Không ?</h4>
              </li>
              <li style={{ listStyle: "none" }}>
                <Button
                  variant="contained"
                  style={{ fontSize: "11px" }}
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                >
                  Xác Nhận
                </Button>
              </li>
            </ul>

            <HighlightOffIcon
              className={styles.close_modal}
              onClick={() => {
                setToggleConfirmModal(false);
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
              setToggleConfirmModal(false);
            }}
          ></div>
          <div className={styles.modal_content}>
            <h4>Bạn Có Chắc Chắn Muốn Hủy Chạy Chuyến này Chứ ?</h4>
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
                  handleCancel();
                }}
              >
                Xác Nhận
              </Button>

              <Button
                variant="contained"
                style={{ fontSize: "11px" }}
                onClick={(e) => {
                  setToggleCancelModal(false);
                }}
              >
                Hủy
              </Button>
            </div>
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
  );
}

export default ScheduleNotAssignment;
