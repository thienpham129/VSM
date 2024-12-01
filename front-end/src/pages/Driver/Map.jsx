import React, { useEffect, useState } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet-routing-machine";
import { root } from "../../helper/axiosClient";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import Button from "@mui/material/Button";

const maps = {
  // base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  base: "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4D4kbtoB1PV8gjRJMqgB",
};

const RoutingControl = createControlComponent(
  ({ position, start, end, color }) => {
    const instance = L.Routing.control({
      position,
      waypoints: [start, end],
      lineOptions: {
        styles: [
          {
            color: color,
            opacity: 0.8,
            weight: 6,
          },
        ],
      },
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    });

    // const translateLaguage = async (text) => {
    //   const res = await fetch(
    //     `https://api.mymemory.translated.net/get?q=${text}&langpair=en|vi`
    //   );
    //   console.log(await res.json());
    // };

    instance.on("routesfound", function (e) {
      const route = e.routes[0]; // Get the first route
      console.log((route.summary.totalDistance / 1000).toFixed(1) + " km");

      setTimeout(() => {
        const instructionContainer = document.querySelector(
          ".leaflet-routing-container"
        );

        console.log(instructionContainer);

        if (instructionContainer) {
          // Apply styles to the instruction container
          instructionContainer.style.backgroundColor = "white";
          instructionContainer.style.maxHeight = "400px";
          instructionContainer.style.maxWidth = "400px";
          instructionContainer.style.overflowY = "auto";
          instructionContainer.style.padding = "10px";
          instructionContainer.style.border = "1px solid #ccc";
          instructionContainer.style.borderRadius = "5px";

          // instructionContainer.addEventListener("click", (event) => {
          //   const target = event.target;

          //   // Example: Log the clicked step
          //   translateLaguage(target.innerText);

          //   console.log("Clicked instruction:", target.innerText);
          // });
        }
      }, 300); // Delay to ensure DOM is ready
    });

    return instance;
  }
);

const Map = () => {
  const [start] = useState([16.0544, 108.2022]); // 216 Duy Tân
  const [end] = useState([16.0754, 108.2355]); // Số 5 Sơn Trà
  const [currScheduleId, setCurrentScheduleId] = useState("");
  const [arrayPickUpAddress, setArrayPickUpAddress] = useState([]);
  const [arrayDropAddress, setArrayDropAddress] = useState([]);
  const [allDataCurrentDay, setAllDataCurrentDay] = useState([]);
  const [preparedScheduleId, setPreparedScheduleId] = useState("");
  const [arrayPointMap, setArrayPointMap] = useState([]);
  const [currentLat, setCurrentLat] = useState("");
  const [currentLong, setCurrentLong] = useState("");

  const [tempArrayPointPickUp, setTempArrayPointPickUp] = useState([]);
  const [tempArrayPointDrop, setTempArrayPointDrop] = useState([]);

  const [optionSearch, setOptionSearch] = useState(false);
  const [inputCurrent, setInputCurrent] = useState("");
  const [inputPhase1, setInputPhase1] = useState("");
  const [inputPhase2, setInputPhase2] = useState("");

  const [corsSearchCurrentLat, setCorsSearchCurrentLat] = useState("");
  const [corsSearchCurrentLon, setCorsSearchCurrentLon] = useState("");

  const [corsSearchLat_1, setCorsSearchLat_1] = useState("");
  const [corsSearchLon_1, setCorsSearchLon_1] = useState("");

  const [corsSearchLat_2, setCorsSearchLat_2] = useState("");
  const [corsSearchLon_2, setCorsSearchLon_2] = useState("");

  const [isClickCurrentSeach, setIsClickCurrentSearch] = useState(false);
  const [isClickSearchNormal, setIsClickSearchNormal] = useState(false);

  const [isVietNamese, setIsVietNamese] = useState(false);

  const fetchCurrentSchedule = async () => {
    const url = "/driver/find-schedule";

    try {
      const response = await root.get(
        `${url}/${localStorage.getItem("userId")}`
      );

      if (response.data) {
        setCurrentScheduleId(response.data.id);
      } else {
        console.log(
          "Something went wrong when call api for fetchCurrentSchedule function"
        );
      }
    } catch (error) {
      console.log(error);
      fetchAllDataScheduleCurrentDay();
    }
  };

  const fetchTicketsInCurrentShedule = async (scheduleId) => {
    const url = "/public/ticket-with-schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response.data) {
        let tempArrayPickUp = [];
        let tempArrayDrop = [];
        response.data.forEach((item, index) => {
          const tempItemPickUp = {
            name: item.fullName,
            address: item.detailAddressToPickUp,
          };
          const tempItemDrop = {
            name: item.fullName,
            address: item.detailAddressDropOff,
          };
          tempArrayPickUp.push(tempItemPickUp);
          tempArrayDrop.push(tempItemDrop);
        });
        setArrayDropAddress(tempArrayDrop);
        setArrayPickUpAddress(tempArrayPickUp);
      } else {
        console.log(
          "Something went wrong when call api for fetchTicketsInCurrentShedule function"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllDataScheduleCurrentDay = async () => {
    const date = new Date();
    const day =
      date.getFullYear() + "-" + (+date.getMonth() + 1) + "-" + date.getDate();
    const url = "driver/driver-schedule";
    try {
      const response = await root.post(url, {
        accountId: localStorage.getItem("userId"),
        day: day,
      });
      if (response.data) {
        setAllDataCurrentDay(response.data);
      } else {
        console.log(
          "Something went wrong when call api for fetchAllDataScheduleCurrentDay function"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currScheduleId !== "") {
      fetchTicketsInCurrentShedule(currScheduleId);
    }
  }, [currScheduleId]);

  useEffect(() => {
    fetchCurrentSchedule();
  }, []);

  useEffect(() => {
    if (allDataCurrentDay.length > 0) {
      let tempArrayCurrentDay = [];
      allDataCurrentDay.forEach((item, index) => {
        if (item.status === "Đã lên lịch") {
          tempArrayCurrentDay.push(item);
        }
      });
      setPreparedScheduleId(tempArrayCurrentDay[0].id);
    }
  }, [allDataCurrentDay]);

  useEffect(() => {
    if (preparedScheduleId !== "") {
      fetchTicketsInCurrentShedule(preparedScheduleId);
    }
  }, [preparedScheduleId]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (arrayPickUpAddress.length > 0) {
      arrayPickUpAddress.forEach((item, index) => {
        console.log(item.address);
        // getCors(item.address, item.name);
      });
    }
  }, [arrayPickUpAddress]);

  useEffect(() => {
    if (inputCurrent) {
      fetchGeocode(inputCurrent).then((data) => {
        if (data && data.features && data.features.length > 0) {
          const { center } = data.features[0];
          console.log("Coordinates:", center);
          setCorsSearchCurrentLat(center[1]);
          setCorsSearchCurrentLon(center[0]);
        }
      });
    }
  }, [inputCurrent]);

  useEffect(() => {
    if (inputPhase1) {
      fetchGeocode(inputPhase1).then((data) => {
        if (data && data.features && data.features.length > 0) {
          const { center } = data.features[0];
          console.log("Coordinates:", center);
          setCorsSearchLat_1(center[1]);
          setCorsSearchLon_1(center[0]);
        }
      });
    }
  }, [inputPhase1]);

  useEffect(() => {
    if (inputPhase2) {
      fetchGeocode(inputPhase2).then((data) => {
        if (data && data.features && data.features.length > 0) {
          const { center } = data.features[0];
          console.log("Coordinates:", center);
          setCorsSearchLat_2(center[1]);
          setCorsSearchLon_2(center[0]);
        }
      });
    }
  }, [inputPhase2]);

  const handleClickSearch = () => {
    setIsClickCurrentSearch(!isClickCurrentSeach);
  };

  useEffect(() => {
    if (!optionSearch) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLong(position.coords.longitude);
      });
    }
  }, [optionSearch]);

  const fetchGeocode = async (address) => {
    const apiKey = "4D4kbtoB1PV8gjRJMqgB";
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
      address
    )}.json?key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (optionSearch) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLong(position.coords.longitude);
      });
    }
  }, [optionSearch]);

  return (
    <>
      {/* <button
        onClick={() => {
          // console.log(arrayPickUpAddress);
          getLatLon();
        }}
      >
        test
      </button> */}

      <div style={{ display: "flex" }}>
        <FormControl
          style={{ width: "170px", height: "40px", marginRight: "20px" }}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: "13px" }}
          >
            Chọn Ngôn Ngữ
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Chọn Ngôn Ngữ"
            onChange={(e) => {
              e.target.value === 1
                ? setIsVietNamese(false)
                : setIsVietNamese(true);
            }}
            style={{ height: "40px" }}
          >
            <MenuItem value={1}>Tiếng Anh</MenuItem>
            <MenuItem value={0}>Tiếng Việt</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "230px", height: "40px" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: "13px" }}
          >
            Chọn Điểm Bắt Đầu
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Chọn Điểm Bắt Đầu"
            onChange={(e) => {
              e.target.value === 1
                ? setOptionSearch(true)
                : setOptionSearch(false);
            }}
            style={{ height: "40px" }}
          >
            <MenuItem value={1}>Nhập Điểm Đi</MenuItem>
            <MenuItem value={0}>Vị Trí Hiện Tại</MenuItem>
          </Select>
        </FormControl>

        {!optionSearch ? (
          <div>
            <input
              type="text"
              placeholder="Nhập Điểm Đến"
              style={{
                height: "35px",
                width: "200px",
                border: "1px solid grey",
                borderRadius: "15px",
                marginLeft: "20px",
              }}
              value={inputCurrent}
              onChange={(e) => setInputCurrent(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Nhập Điểm Bắt Đầu"
              style={{
                height: "35px",
                width: "200px",
                border: "1px solid grey",
                borderRadius: "15px",
                marginLeft: "20px",
              }}
              onChange={(e) => {
                setInputPhase1(e.target.value);
              }}
              value={inputPhase1}
            />
            <input
              type="text"
              placeholder="Nhập Điểm Đến"
              style={{
                height: "35px",
                width: "200px",
                border: "1px solid grey",
                borderRadius: "15px",
                marginLeft: "20px",
              }}
              onChange={(e) => {
                setInputPhase2(e.target.value);
              }}
              value={inputPhase2}
            />

            {/* <Button
              style={{
                width: "75px",
                fontSize: "9px",
                marginLeft: "20px",
              }}
              variant="contained"
            >
              Tìm Kiếm
            </Button> */}
          </div>
        )}
        <Button
          style={{
            width: "75px",
            fontSize: "9px",
            marginLeft: "20px",
          }}
          variant="contained"
          onClick={handleClickSearch}
        >
          Tìm Kiếm
        </Button>
      </div>

      {isClickCurrentSeach ? (
        <>
          <MapContainer
            center={[currentLat, currentLong]}
            zoom={13}
            zoomControl={true}
            style={{ height: "100vh", width: "100%" }}
          >
            <RoutingControl
              position={"topleft"}
              start={[currentLat, currentLong]}
              end={[corsSearchCurrentLat, corsSearchCurrentLon]}
              color={"blue"}
            />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url={maps.base}
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </MapContainer>{" "}
        </>
      ) : (
        <MapContainer
          center={[corsSearchLat_1, corsSearchLon_1]}
          zoom={13}
          zoomControl={true}
          style={{ height: "100vh", width: "100%" }}
        >
          <RoutingControl
            position={"topleft"}
            start={[corsSearchLat_1, corsSearchLon_1]}
            end={[corsSearchLat_2, corsSearchLon_2]}
            color={"blue"}
          />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      )}

      {/* <MapContainer
        center={start}
        zoom={13}
        zoomControl={true}
        style={{ height: "100vh", width: "100%" }} // Fixed style property
      >
        <RoutingControl
          position={"topleft"}
          start={start}
          end={end}
          color={"blue"}
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer> */}
    </>
  );
};

export default Map;
