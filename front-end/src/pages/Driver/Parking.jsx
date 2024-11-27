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
  // const columns = [
  //   {
  //     name: "Tên Bãi Đỗ",
  //     selector: (row) => row.name,
  //   },
  //   {
  //     name: "Địa Điểm",
  //     selector: (row) => row.address,
  //   },
  //   {
  //     name: "Sức Chứa",
  //     selector: (row) => row.capacity,
  //   },
  //   {
  //     name: "Số Xe Đã Đỗ",
  //     selector: (row) => row.number_of_parked_cars,
  //   },
  //   {
  //     name: "Còn Trống",
  //     selector: (row) => row.empty,
  //   },
  //   {
  //     name: "",
  //     selector: (row) => row.action,
  //   },
  // ];

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

  const [toggleModal, setToggleModal] = useState(false);
  const [nameParking, setNameParking] = useState("");
  const [addressParking, setAddressParking] = useState("");
  const [dataParking, setDataParking] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataInput, setDataInput] = useState("");
  const [finalDataParking, setFinalDataParking] = useState([]);
  const [searchName, setSearchName] = useState(true);
  const changeDataParking = () => {
    const updatedData = dataParking.map((item) => ({
      ...item,
      action: (
        <div>
          <Button
            style={{ width: "75px", fontSize: "9px" }}
            variant="contained"
            disabled={!item.empty}
            onClick={(e) => {
              setToggleModal(true);
              setNameParking(
                e.target.parentElement.parentElement.parentElement.parentElement
                  .firstChild.innerText
              );
              setAddressParking(
                e.target.parentElement.parentElement.parentElement.parentElement
                  .firstChild.nextSibling.innerText
              );
            }}
          >
            Xác Nhận
          </Button>
        </div>
      ),
    }));

    // setDataParking(updatedData);
    setFinalDataParking(updatedData);
  };

  const hanldeConfirm = () => {
    const url = notifyScucessConfirm();
    setToggleModal(false);
  };

  const handleSearchParking = (e) => {
    if (searchName) {
      setDataInput(e.target.value);
      const tempArray = [];
      finalDataParking.forEach((item, index) => {
        if (
          item.name
            .toLocaleUpperCase()
            .includes(e.target.value.toLocaleUpperCase())
        ) {
          tempArray.push(item);
        }
      });
      setDataFilter(tempArray);
    } else {
      setDataInput(e.target.value);
      const tempArray = [];
      finalDataParking.forEach((item, index) => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "/admin/parkings";
      try {
        const response = await root.get(url);
        if (response) {
          setDataParking(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dataParking.length > 0) {
      changeDataParking();
    }
  }, [dataParking]);

  return (
    <div>
      <h1>Bãi Đỗ Xe</h1>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "65%" }}>
        <FormControl style={{ width: "230px", height: "40px" }}>
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
      ) : (
        <DataTable columns={columns} data={finalDataParking} />
      )}
      {/* <DataTable columns={columns} data={dataParking} /> */}
      <div className={styles.messages}>
        <img src={parkingIcon} alt="Parking Icon" style={{ width: "65px" }} />
        <ul>
          <li>Xe Của Bạn Được Xác Nhận Đỗ Ở Bãi Đỗ Xe: {nameParking}</li>
          <li>Tại Địa Điểm: {addressParking} </li>
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
                onClick={hanldeConfirm}
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
