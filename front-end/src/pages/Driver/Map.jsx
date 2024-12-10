import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
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
import ReactMapGL from "@goongmaps/goong-map-react";
import MapGL from "@goongmaps/goong-map-react";
import GoongMap from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";
import location_icon from "./location_icon.png";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import car_icon from "./car-icon.png";
import destination_icon from "./destination-icon.png";

const maps = {
  // base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  base: "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4D4kbtoB1PV8gjRJMqgB",
};

const driverIcon = new L.Icon({
  iconUrl: car_icon, // Path to your custom driver marker image
  iconSize: [50, 50], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to the marker's position
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

const destinationIcon = new L.Icon({
  iconUrl: destination_icon, // Path to your custom destination marker image
  iconSize: [50, 50], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to the marker's position
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

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
      createMarker: function () {
        return null; // This removes the markers from the waypoints
      },
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
        instructionContainer.style.display = "none";

        // if (instructionContainer) {
        //   // Apply styles to the instruction container
        //   instructionContainer.style.backgroundColor = "white";
        //   instructionContainer.style.maxHeight = "400px";
        //   instructionContainer.style.maxWidth = "400px";
        //   instructionContainer.style.overflowY = "auto";
        //   instructionContainer.style.padding = "10px";
        //   instructionContainer.style.border = "1px solid #ccc";
        //   instructionContainer.style.borderRadius = "5px";

        //   // instructionContainer.addEventListener("click", (event) => {
        //   //   const target = event.target;

        //   //   // Example: Log the clicked step
        //   //   translateLaguage(target.innerText);

        //   //   console.log("Clicked instruction:", target.innerText);
        //   // });
        // }
      }, 300);
    });

    return instance;
  }
);

const Map = () => {
  // const [viewport, setViewport] = useState({
  //   width: "100%",
  //   height: "100vh",
  //   latitude: 37.7577,
  //   longitude: -122.4376,
  //   zoom: 8,
  // });

  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const [start] = useState([16.0544, 108.2022]); // 216 Duy Tân
  const [end] = useState([16.0754, 108.2355]); // Số 5 Sơn Trà
  const [currScheduleId, setCurrentScheduleId] = useState("");
  const [arrayPickUpAddress, setArrayPickUpAddress] = useState([]);
  const [arrayDropAddress, setArrayDropAddress] = useState([]);
  const [allDataCurrentDay, setAllDataCurrentDay] = useState([]);
  const [preparedScheduleId, setPreparedScheduleId] = useState("");
  const [distance, setDistance] = useState("");
  const [arrayPointMapPickUp, setArrayPointMapPickUp] = useState([]);
  const [arrayPointMapDrop, setArrayPointMapDrop] = useState([]);
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

  const [arrayDataSendBE, setArrayDataSendBE] = useState([]);

  const [inputTest, setInputTest] = useState("");
  const [suggesstAddress, setSuggestAddress] = useState([]);
  const [isShowSuggest, setIsShowSuggest] = useState(false);

  const [suggestAddressPhase1, setSuggestAddressPhase1] = useState([]);
  const [suggestAddressPhase2, setSuggestAddressPhase2] = useState([]);

  const [isShowSuggestPhase1, setIsShowSuggestPhase1] = useState(false);
  const [isShowSuggestPhase2, setIsShowSuggestPhase2] = useState(false);

  const fetchCurrentSchedule = async () => {
    const url = "/driver/find-schedule";

    try {
      const response = await root.get(
        `${url}/${localStorage.getItem("userId")}`
      );

      if (response.data) {
        setCurrentScheduleId(response.data.id);
        console.log(response.data + " HEREEEEEEEEEEEEEEEEEE");
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
            id: item.ticketId,
            name: item.fullName,
            address: item.detailAddressToPickUp,
          };
          const tempItemDrop = {
            id: item.ticketId,
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

  useEffect(() => {
    if (currScheduleId !== "") {
      fetchTicketsInCurrentShedule(currScheduleId);
    }
  }, [currScheduleId]);

  useEffect(() => {
    fetchCurrentSchedule();
  }, []);

  const fetchAllDataScheduleCurrentDay = async () => {
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
    if (allDataCurrentDay.length > 0) {
      let tempArrayCurrentDay = [];
      allDataCurrentDay.forEach((item, index) => {
        if (item.status === "Đã lên lịch") {
          tempArrayCurrentDay.push(item);
        }
      });
      for (let i = 0; i < tempArrayCurrentDay.length; i++) {
        for (let j = i + 1; j < tempArrayCurrentDay.length; j++) {
          if (
            +tempArrayCurrentDay[i].startTime.split("T")[1].split(":")[0] >
            +tempArrayCurrentDay[j].startTime.split("T")[1].split(":")[0]
          ) {
            let tempt = tempArrayCurrentDay[i];
            tempArrayCurrentDay[i] = tempArrayCurrentDay[j];
            tempArrayCurrentDay[j] = tempt;
          }
        }
      }
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

  const getDistance = async (startLat, startLon, endLat, endLon) => {
    const url = `https://api.maptiler.com/routes/directions/v2/${startLon},${startLat};${endLon},${endLat}?key=4D4kbtoB1PV8gjRJMqgB&steps=false&geometries=geojson`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch route data");
      }

      const data = await response.json();
      const route = data.routes[0]; // Access the first route
      const distanceInKm = (route.distance / 1000).toFixed(1); // Convert meters to kilometers
      console.log("Distance:", distanceInKm);

      setDistance(distanceInKm); // Save to state
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  useEffect(() => {
    if (arrayPickUpAddress.length > 0) {
      let tempArrayPickUp = [];
      let tempArrayDrop = [];

      for (let i = 0; i < arrayPickUpAddress.length; i++) {
        for (let j = i + 1; j < arrayPickUpAddress.length; j++) {
          let tempStartLat = "";
          let tempStartLon = "";
          let tempEndLat = "";
          let tempEndLon = "";

          fetchGeocode(arrayPickUpAddress[i].address).then((data) => {
            if (data && data.features && data.features.length > 0) {
              const { center } = data.features[0];
              tempStartLat = center[1];
              tempStartLon = center[0];
              console.log("Coordinates:", center[1]);
            }
          });

          fetchGeocode(arrayPickUpAddress[j].address).then((data) => {
            if (data && data.features && data.features.length > 0) {
              const { center } = data.features[0];
              tempEndLat = center[1];
              tempEndLon = center[0];
              console.log("Coordinates:", center[1]);
            }
          });

          getDistance(tempStartLat, tempStartLon, tempEndLat, tempEndLon);
          // console.log(
          //   getDistance(tempStartLat, tempStartLon, tempEndLat, tempEndLon) +
          //     "    Distance"
          // );
        }
      }

      arrayDropAddress.forEach((item, index) => {
        console.log(item.address);
      });
    }
  }, [arrayPickUpAddress]);

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
      // navigator.geolocation.getCurrentPosition((position) => {
      //   setCurrentLat(position.coords.latitude);
      //   setCurrentLong(position.coords.longitude);
      // });
      setInputCurrent("");
      setCorsSearchCurrentLat("");
      setCorsSearchCurrentLon("");
    } else {
      setInputPhase1("");
      setInputPhase2("");
      setCorsSearchLat_1("");
      setCorsSearchLon_1("");
      setCorsSearchLat_2("");
      setCorsSearchLon_2("");
    }
  }, [optionSearch]);

  useEffect(() => {
    if (inputCurrent) {
      const delayDebounceFn = setTimeout(() => {
        const query = inputCurrent.trim();
        if (query) {
          const fetchAddressData = async () => {
            try {
              const response = await fetch(
                `https://rsapi.goong.io/Place/AutoComplete?api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo&input=${query}`
              );
              const data = await response.json();
              setSuggestAddress(data.predictions);
            } catch (error) {
              console.log(error);
            }
          };
          fetchAddressData();
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsShowSuggest(false);
    }
  }, [inputCurrent]);

  const handleSearchInCurrent = () => {
    fetchGeocode(inputCurrent.trim()).then((data) => {
      if (data && data.features && data.features.length > 0) {
        const { center } = data.features[0];
        console.log("Coordinates:", center);
        setCorsSearchCurrentLat(center[1]);
        setCorsSearchCurrentLon(center[0]);
      }
    });
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLong(position.coords.longitude);
    });
  };

  // useEffect(() => {
  //   if (inputPhase1) {
  //     fetchGeocode(inputPhase1).then((data) => {
  //       if (data && data.features && data.features.length > 0) {
  //         const { center } = data.features[0];
  //         console.log("Coordinates:", center);
  //         setCorsSearchLat_1(center[1]);
  //         setCorsSearchLon_1(center[0]);
  //       }
  //     });
  //   }
  // }, [inputPhase1]);

  // useEffect(() => {
  //   if (inputPhase2) {
  //     fetchGeocode(inputPhase2).then((data) => {
  //       if (data && data.features && data.features.length > 0) {
  //         const { center } = data.features[0];
  //         console.log("Coordinates:", center);
  //         setCorsSearchLat_2(center[1]);
  //         setCorsSearchLon_2(center[0]);
  //       }
  //     });
  //   }
  // }, [inputPhase2]);

  useEffect(() => {
    if (inputPhase1) {
      const delayDebounceFn = setTimeout(() => {
        const query = inputPhase1.trim();
        if (query) {
          const fetchAddressData = async () => {
            try {
              const response = await fetch(
                `https://rsapi.goong.io/Place/AutoComplete?api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo&input=${query}`
              );
              const data = await response.json();
              setSuggestAddressPhase1(data.predictions);
            } catch (error) {
              console.log(error);
            }
          };
          fetchAddressData();
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsShowSuggestPhase1(false);
    }
  }, [inputPhase1]);

  useEffect(() => {
    if (inputPhase2) {
      const delayDebounceFn = setTimeout(() => {
        const query = inputPhase2.trim();
        if (query) {
          const fetchAddressData = async () => {
            try {
              const response = await fetch(
                `https://rsapi.goong.io/Place/AutoComplete?api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo&input=${query}`
              );
              const data = await response.json();
              setSuggestAddressPhase2(data.predictions);
            } catch (error) {
              console.log(error);
            }
          };
          fetchAddressData();
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsShowSuggestPhase2(false);
    }
  }, [inputPhase2]);

  const handleSearchTwoPlaces = () => {
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
  };

  useEffect(() => {
    if (suggesstAddress.length > 0) {
      console.log(suggesstAddress);
    }
  }, [suggesstAddress]);

  return (
    <>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {/* <button
        onClick={() => {
          console.log(currScheduleId);
        }}
      >
        test
      </button> */}

      {/* <FormControl
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
        </FormControl> */}

      <div style={{ display: "flex" }}>
        <FormControl
          style={{
            width: "230px",
            height: "40px",
            marginTop: "10px",
            marginLeft: "20px",
          }}
        >
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
            <div className={styles.search_box}>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Nhập Địa Chỉ Đến"
                  className={styles.input_box}
                  id="input-box"
                  style={{
                    height: "35px",
                    border: "1px solid grey",
                    fontSize: "15px",
                  }}
                  value={inputCurrent}
                  onChange={(e) => {
                    setCorsSearchCurrentLat("");
                    setCorsSearchCurrentLon("");
                    setIsShowSuggest(true);
                    setInputCurrent(e.target.value);
                  }}
                  autoComplete="off"
                />
                <Button
                  style={{
                    width: "75px",
                    height: "40px",
                    fontSize: "9.1px",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  onClick={handleSearchInCurrent}
                >
                  Tìm Kiếm
                </Button>
              </div>
              {suggesstAddress.length > 0 && isShowSuggest ? (
                <div className={styles.result_box}>
                  <ul>
                    {suggesstAddress.map((item) => (
                      <li
                        onClick={() => {
                          setInputCurrent(item.description);
                          setIsShowSuggest(false);
                        }}
                      >
                        {" "}
                        <img
                          src={location_icon}
                          alt="location_icon"
                          style={{ width: "24px", height: "24px" }}
                        />{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <div className={styles.search_box} style={{ width: "300px" }}>
              <div className={styles.row} style={{ padding: " 10px" }}>
                <input
                  type="text"
                  placeholder="Nhập Địa Chỉ Đi"
                  className={styles.input_box}
                  id="input-box"
                  style={{
                    height: "35px",
                    border: "1px solid grey",
                    fontSize: "15px",
                  }}
                  value={inputPhase1}
                  onChange={(e) => {
                    setIsShowSuggestPhase1(true);
                    setInputPhase1(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>
              {suggestAddressPhase1.length > 0 && isShowSuggestPhase1 ? (
                <div className={styles.result_box}>
                  <ul>
                    {suggestAddressPhase1.map((item) => (
                      <li
                        onClick={() => {
                          setInputPhase1(item.description);
                          setIsShowSuggestPhase1(false);
                        }}
                      >
                        {" "}
                        <img
                          src={location_icon}
                          alt="location_icon"
                          style={{ width: "24px", height: "24px" }}
                        />{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.search_box}>
              <div className={styles.row} style={{ padding: "10px" }}>
                <input
                  type="text"
                  placeholder="Nhập Địa Chỉ Đến"
                  className={styles.input_box}
                  id="input-box"
                  style={{
                    height: "35px",
                    border: "1px solid grey",
                    fontSize: "15px",
                  }}
                  value={inputPhase2}
                  onChange={(e) => {
                    setIsShowSuggestPhase2(true);
                    setInputPhase2(e.target.value);
                  }}
                  autoComplete="off"
                />

                <Button
                  style={{
                    width: "75px",
                    height: "40px",
                    fontSize: "9.1px",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  onClick={handleSearchTwoPlaces}
                >
                  Tìm Kiếm
                </Button>
              </div>
              {suggestAddressPhase2.length > 0 && isShowSuggestPhase2 ? (
                <div className={styles.result_box}>
                  <ul>
                    {suggestAddressPhase2.map((item) => (
                      <li
                        onClick={() => {
                          setInputPhase2(item.description);
                          setIsShowSuggestPhase2(false);
                        }}
                      >
                        {" "}
                        <img
                          src={location_icon}
                          alt="location_icon"
                          style={{ width: "24px", height: "24px" }}
                        />{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>

      {corsSearchCurrentLat && corsSearchCurrentLon ? (
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

          <Marker position={[currentLat, currentLong]} icon={driverIcon}>
            <Popup>Vị Trí Của Bạn Hiện Tại</Popup>
          </Marker>

          <Marker
            position={[corsSearchCurrentLat, corsSearchCurrentLon]}
            icon={destinationIcon}
          >
            <Popup>Điểm Đến: {inputCurrent}</Popup>
          </Marker>

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      ) : (
        ""
      )}

      {corsSearchLat_1 &&
      corsSearchLon_1 &&
      corsSearchLat_2 &&
      corsSearchLon_2 ? (
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

          <Marker
            position={[corsSearchLat_1, corsSearchLon_1]}
            icon={driverIcon}
          >
            <Popup>Điểm Bắt Đầu: {inputPhase1}</Popup>
          </Marker>

          <Marker
            position={[corsSearchLat_2, corsSearchLon_2]}
            icon={destinationIcon}
          >
            <Popup>Điểm Đến: {inputPhase2}</Popup>
          </Marker>

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      ) : (
        ""
      )}

      {/* {isClickCurrentSeach ? (
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
      )} */}

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
