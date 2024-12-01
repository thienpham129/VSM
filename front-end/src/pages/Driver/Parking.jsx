import React, { useState, useEffect } from "react";
// import { dataParking } from "./dataParking";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import styles from "./parking.module.css";
import parkingIcon from "./parkingIcon.png";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";

import { root } from "../../helper/axiosClient";

function Parking() {
  const columns = [
    {
      name: "Tên Bãi Đỗ",
      selector: (row) => row.name,
    },
    {
      name: "Địa Điểm",
      selector: (row) => row.location,
    },
    {
      name: "Sức Chứa",
      selector: (row) => row.capacity,
    },
    {
      name: "Số Xe Đã Đỗ",
      selector: (row) => row.numCar,
    },
    {
      name: "Trạng Thái",
      selector: (row) => {
        if (row.empty === true)
          return (
            <div style={{ fontWeight: "bold", color: "blue" }}>Còn Trống</div>
          );
        return (
          <div style={{ fontWeight: "bold", color: "red" }}>Đã Hết Chỗ</div>
        );
      },
    },
    {
      name: "",
      selector: (row) => row.action,
    },
  ];

  const notifyScucessConfirm = () =>
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

  const notifyErrorConfirm = () =>
    toast.error("Xác Nhận Thất Bại", {
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

  const notifyWarnConfirm = () =>
    toast.warn("Bãi Đỗ Xe Đã Hết Chỗ. Vui Lòng Chọn Bãi Đỗ Xe Khác.", {
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

  const [toggleModal, setToggleModal] = useState(false);
  const [nameParking, setNameParking] = useState("");
  const [nameParkingRes, setNameParkingRes] = useState("");
  const [addressParking, setAddressParking] = useState("");
  const [addressParkingRes, setAddressParkingRes] = useState("");
  const [dataParking, setDataParking] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataInput, setDataInput] = useState("");
  const [allDataParkings, setAllDataParking] = useState([]);
  const [searchName, setSearchName] = useState(true);
  const [isParkingEmpty, setIsParkingEmpty] = useState(true);
  const [viewOption, setViewOption] = useState("");
  const [daNangParkings, setDaNangParkings] = useState([]);
  const [hueParkings, setHueParkings] = useState([]);
  const [qnParkings, setQNParkings] = useState([]);
  const [currentDestination, setCurrentDestination] = useState("");
  const [currentDataParking, setCurrentDataParking] = useState([]);
  const [carId, setCarId] = useState("");
  const [parking, setParking] = useState("");
  const [parkingId, setParkingId] = useState("");
  const [isClickConfirm, setIsClickConfirm] = useState(false);
  const changeDataParking = () => {
    const updatedData = dataParking.map((item) => ({
      ...item,
      action: (
        <div>
          <Button
            style={{ width: "75px", fontSize: "9px" }}
            variant="contained"
            // disabled={!item.empty}
            onClick={(e) => {
              if (!item.empty) {
                setIsParkingEmpty(false);
              } else {
                setIsParkingEmpty(true);
              }
              setToggleModal(true);
              setNameParking(
                e.target.parentElement.parentElement.parentElement.parentElement
                  .firstChild.innerText
              );
              setAddressParking(
                e.target.parentElement.parentElement.parentElement.parentElement
                  .firstChild.nextSibling.innerText
              );
              setParkingId(item.id);
            }}
          >
            Xác Nhận
          </Button>
        </div>
      ),
    }));

    // setDataParking(updatedData);
    setAllDataParking(updatedData);
  };

  const classifyDataParking = () => {
    const dncity = "Đà Nẵng";
    const huecity = "Huế";
    const qncity = "Quảng Nam";
    const dnParkings = [];
    const hueParkings = [];
    const qnParkings = [];
    allDataParkings.forEach((item, index) => {
      if (
        item.location
          .toLocaleUpperCase()
          .trim()
          .includes(dncity.toLocaleUpperCase())
      ) {
        dnParkings.push(item);
      }

      if (
        item.location
          .toLocaleUpperCase()
          .trim()
          .includes(huecity.toLocaleUpperCase())
      ) {
        hueParkings.push(item);
      }

      if (
        item.location
          .toLocaleUpperCase()
          .trim()
          .includes(qncity.toLocaleUpperCase())
      ) {
        qnParkings.push(item);
      }
      setDaNangParkings(dnParkings);
      setHueParkings(hueParkings);
      setQNParkings(qnParkings);
    });
  };

  const hanldeConfirm = async () => {
    if (isParkingEmpty) {
      const url = "driver/update-parking";
      try {
        const response = await root.post(url, {
          accountId: localStorage.getItem("userId"),
          parkingId: parkingId,
        });
        if (response.data) {
          fetchCurrentScheduleData();
          notifyScucessConfirm();
          setToggleModal(false);
        } else {
          console.log(
            "Something went wrong with call api update-parking driver"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyWarnConfirm();
    }
  };

  const handleSearchParking = (e) => {
    if (searchName) {
      if (viewOption) {
        if (viewOption.toLocaleUpperCase() === "ĐÀ NẴNG") {
          setDataInput(e.target.value);
          const tempArray = [];
          daNangParkings.forEach((item, index) => {
            if (
              item.name
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "HUẾ") {
          setDataInput(e.target.value);
          const tempArray = [];
          hueParkings.forEach((item, index) => {
            if (
              item.name
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "QUẢNG NAM") {
          setDataInput(e.target.value);
          const tempArray = [];
          qnParkings.forEach((item, index) => {
            if (
              item.name
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "ALL") {
          setDataInput(e.target.value);
          const tempArray = [];
          allDataParkings.forEach((item, index) => {
            if (
              item.name
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }
      } else {
        setDataInput(e.target.value);
        const tempArray = [];
        currentDataParking.forEach((item, index) => {
          if (
            item.name
              .toLocaleUpperCase()
              .includes(e.target.value.toLocaleUpperCase())
          ) {
            tempArray.push(item);
          }
        });
        setDataFilter(tempArray);
      }
    } else {
      if (viewOption) {
        if (viewOption.toLocaleUpperCase() === "ĐÀ NẴNG") {
          setDataInput(e.target.value);
          const tempArray = [];
          daNangParkings.forEach((item, index) => {
            if (
              item.location
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "HUẾ") {
          setDataInput(e.target.value);
          const tempArray = [];
          hueParkings.forEach((item, index) => {
            if (
              item.location
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "QUẢNG NAM") {
          setDataInput(e.target.value);
          const tempArray = [];
          qnParkings.forEach((item, index) => {
            if (
              item.location
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }

        if (viewOption.toLocaleUpperCase() === "ALL") {
          setDataInput(e.target.value);
          const tempArray = [];
          allDataParkings.forEach((item, index) => {
            if (
              item.location
                .toLocaleUpperCase()
                .includes(e.target.value.toLocaleUpperCase())
            ) {
              tempArray.push(item);
            }
          });
          setDataFilter(tempArray);
        }
      } else {
        setDataInput(e.target.value);
        const tempArray = [];
        currentDataParking.forEach((item, index) => {
          if (
            item.location
              .toLocaleUpperCase()
              .includes(e.target.value.toLocaleUpperCase())
          ) {
            tempArray.push(item);
          }
        });
        setDataFilter(tempArray);
      }
    }
  };

  const fetchCurrentScheduleData = async () => {
    const url = "/driver/find-schedule";
    try {
      const response = await root.get(
        `${url}/${localStorage.getItem("userId")}`
      );
      if (response.data) {
        setCurrentDestination(response.data.route.stopLocation);
        setCarId(response.data.car.carId);
        setNameParkingRes(response.data.car.parking.name);
        setAddressParkingRes(response.data.car.parking.location);
      } else {
        console.log(
          "Something went wrong when call api for fetchCurrentScheduleData function"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentScheduleData();
  }, []);

  useEffect(() => {
    if (
      currentDestination !== "" &&
      daNangParkings &&
      hueParkings &&
      qnParkings
    ) {
      if (currentDestination.toLocaleUpperCase() === "ĐÀ NẴNG") {
        setCurrentDataParking(daNangParkings);
      }

      if (currentDestination.toLocaleUpperCase() === "HUẾ") {
        setCurrentDataParking(hueParkings);
      }

      if (currentDestination.toLocaleUpperCase() === "QUẢNG NAM") {
        setCurrentDataParking(qnParkings);
      }
    }
  }, [currentDestination, daNangParkings, hueParkings, qnParkings]);

  const fetchData = async () => {
    const url = "/driver/parkings";
    try {
      const response = await root.get(url);
      if (response) {
        setDataParking(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataParking.length > 0) {
      changeDataParking();
    }
  }, [dataParking]);

  useEffect(() => {
    if (allDataParkings.length > 0) {
      classifyDataParking();
    }
  }, [allDataParkings]);

  const getParkingById = async () => {
    const url = "/driver/parking/";
    // const response = root.get
  };

  const generateDataTable = (addressOption) => {
    if (addressOption.toLocaleUpperCase() === "ĐÀ NẴNG") {
      return <DataTable columns={columns} data={daNangParkings} />;
    }

    if (addressOption.toLocaleUpperCase() === "HUẾ") {
      console.log(addressOption.toLocaleUpperCase());
      return <DataTable columns={columns} data={hueParkings} />;
    }

    if (addressOption.toLocaleUpperCase() === "QUẢNG NAM") {
      return <DataTable columns={columns} data={qnParkings} />;
    } else {
      return <DataTable columns={columns} data={allDataParkings} />;
    }
  };

  return (
    <div>
      <h1>Bãi Đỗ Xe</h1>
      {/* <button
        onClick={() => {
          // console.log(daNangParkings);

          // console.log(hueParkings);

          // console.log(qnParkings);
          // console.log(currentDestination);
          // console.log(currentDataParking);
          // console.log(hueParkings);
          console.log(nameParkingRes);
          console.log(addressParkingRes);
          // alert(parking);
        }}
      >
        test
      </button> */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "45%" }}>
        <FormControl style={{ width: "230px", height: "40px" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: "13px" }}
          >
            Lựa Chọn Xem Bãi Đỗ
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Lựa Chọn Xem Bãi Đỗ"
            value={viewOption}
            // value={viewOption}
            onChange={(e) => {
              setViewOption(e.target.value);
            }}
            style={{ height: "40px" }}
          >
            <MenuItem value={currentDestination}>
              Mặc Định (Xem Bãi Đỗ Theo Lịch Trình){" "}
            </MenuItem>
            <MenuItem value="ĐÀ NẴNG">Xem Bãi Đỗ Đà Nẵng</MenuItem>
            <MenuItem value="HUẾ">Xem Bãi Đỗ Huế</MenuItem>
            <MenuItem value="QUẢNG NAM">Xem Bãi Đỗ Quảng Nam</MenuItem>
            <MenuItem value="ALL">Xem Tất Cả Bãi Đỗ</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          style={{ width: "230px", height: "40px", marginLeft: "20px" }}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: "13px" }}
          >
            Lựa Chọn Tìm Kiếm
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Lựa Chọn Tìm Kiếm"
            // value={searchName ? 1 : 0}
            onChange={(e) => {
              e.target.value === 1 ? setSearchName(true) : setSearchName(false);
            }}
            style={{ height: "40px" }}
          >
            <MenuItem value={1}>Tìm Kiếm Theo Tên</MenuItem>
            <MenuItem value={0}>Tìm Kiếm Theo Địa Điểm</MenuItem>
          </Select>
        </FormControl>

        {searchName ? (
          <input
            type="text"
            placeholder="Tìm Kiếm Theo Tên"
            style={{
              // marginLeft: "77%",
              height: "35px",
              width: "200px",
              border: "1px solid grey",
              borderRadius: "15px",
              marginLeft: "20px",
            }}
            value={dataInput}
            onChange={(e) => handleSearchParking(e)}
          />
        ) : (
          <input
            type="text"
            placeholder="Tìm Kiếm Theo Địa Điểm"
            style={{
              // marginLeft: "77%",
              height: "35px",
              width: "200px",
              border: "1px solid grey",
              borderRadius: "15px",
              marginLeft: "20px",
            }}
            value={dataInput}
            onChange={(e) => handleSearchParking(e)}
          />
        )}
      </div>
      {dataInput ? (
        <DataTable columns={columns} data={dataFilter} />
      ) : viewOption !== "" ? (
        generateDataTable(viewOption)
      ) : (
        generateDataTable(currentDestination)
      )}

      <div
        className={
          nameParkingRes && addressParkingRes
            ? styles.messages
            : styles.hiddenMessage
        }
      >
        <img src={parkingIcon} alt="Parking Icon" style={{ width: "65px" }} />
        <ul>
          <li>Xe Của Bạn Được Xác Nhận Đỗ Ở Bãi Đỗ Xe: {nameParkingRes}</li>
          <li>Tại Địa Điểm: {addressParkingRes} </li>
        </ul>
      </div>

      {toggleModal ? (
        <div className={styles.modal}>
          <div
            className={styles.overlay}
            onClick={() => {
              setToggleModal(false);
            }}
          ></div>
          <div
            className={styles.modal_content}
            style={{ position: "relative" }}
          >
            <h3 style={{ textAlign: "center" }}>Xác Nhận Thông Tin</h3>
            <ul>
              <li>
                Bạn Muốn Đỗ Xe Ở{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {nameParking}{" "}
                </span>
              </li>
              <li>
                Tại Địa Điểm{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {addressParking}{" "}
                </span>{" "}
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
                style={{
                  width: "75px",
                  fontSize: "9px",
                }}
                variant="contained"
                onClick={() => {
                  setToggleModal(false);
                }}
              >
                Hủy
              </Button>

              <Button
                style={{ width: "90px", fontSize: "9px", marginLeft: "10px" }}
                variant="contained"
                onClick={() => {
                  setIsClickConfirm(true);
                  hanldeConfirm();
                }}
              >
                Xác Nhận
              </Button>
            </div>
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

export default Parking;
