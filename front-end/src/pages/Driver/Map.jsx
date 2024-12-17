import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import "leaflet-routing-machine";
import { root } from "../../helper/axiosClient";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { alertClasses, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import GoongMapWithDirections from "./RoutingMap";

const maps = {
  // base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  base: "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Y6lAo3CsQyyqIuPGhSl3",
};

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "vi-VI";
recognition.continuous = false;

const driverIcon = new L.Icon({
  iconUrl: car_icon,
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const destinationIcon = new L.Icon({
  iconUrl: destination_icon,
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

//ROUTIMNG OSRM HERE

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
        return null;
      },
    });

    instance.on("routesfound", function (e) {
      const route = e.routes[0]; // Get the first route
      console.log((route.summary.totalDistance / 1000).toFixed(1) + " km");

      setTimeout(() => {
        const instructionContainer = document.querySelector(
          ".leaflet-routing-container"
        );
        console.log(instructionContainer);
        instructionContainer.style.display = "none";
      }, 300);
    });

    return instance;
  }
);

//ROUTIMNG OSRM HERE

const Map = () => {
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

  // const [userPickUpLat, setUserPickUpLat] = useState("");
  // const [userPickUpLon, setUserPickUpLon] = useState("");
  // const [userDropLat, setUserDropLat] = useState("");
  // const [userDropLon, setUserDropLon] = useState("");
  const [schduleId, setSchduleId] = useState("");
  const [userLat, setUserLat] = useState("");
  const [userLon, setUserLon] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [inforVoice, setInforVoice] = useState("");
  const [resultSearchVoice, setResultSeatchVoice] = useState("");
  const [voiceSearchOnceLat, setVoiceSearchOnceLat] = useState("");
  const [voiceSearchOnceLon, setVoiceSearchOnceLon] = useState("");

  const [voiceSearchAddress1Lat, setVoiceSearchAddress1Lat] = useState("");
  const [voiceSearchAddress1Lon, setVoiceSearchAddress1Lon] = useState("");

  const [voiceSearchAddress2Lat, setVoiceSearchAddress2Lat] = useState("");
  const [voiceSearchAddress2Lon, setVoiceSearchAddress2Lon] = useState("");

  const [addressOneVoice, setAddressOnceVoice] = useState("");
  const [addressStartVoice, setAddressStartVoice] = useState("");
  const [addressEndVoice, setAddressEndVoice] = useState("");

  const [currentCity, setCurrentCity] = useState("");

  const fetchCurrentSchedule = async () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setCurrentLat(position.coords.latitude);
    //   setCurrentLong(position.coords.longitude);
    // });
    const url = "/driver/find-schedule";

    try {
      const response = await root.get(
        `${url}/${localStorage.getItem("userId")}`
      );

      if (response.data) {
        setCurrentScheduleId(response.data.id);
        setSchduleId(response.data.id);
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

  useEffect(() => {
    fetchCurrentSchedule();
  }, []);

  const fetchTicketsInCurrentShedule = async (scheduleId) => {
    const url = "/public/ticket-with-schedule";
    try {
      const response = await root.get(`${url}/${scheduleId}`);
      if (response.data) {
        console.log("Hakdfkjahfahdfjhadjfhjadhfjadhfkjahdfjah");
        console.log(response.data);
        let countInitial = 0;
        let countNextDes = 0;
        let arrayTicket = [];
        response.data.forEach((item, index) => {
          if (
            // item.mapStatus === "0" &&
            item.status.toLocaleUpperCase().trim() === "ĐÃ THANH TOÁN" ||
            item.status.toLocaleUpperCase().trim() === "CHƯA LÊN XE" ||
            item.status.toLocaleUpperCase().trim() === "ĐÃ XUỐNG XE" ||
            item.status.toLocaleUpperCase().trim() === "HỦY" ||
            item.status.toLocaleUpperCase().trim() === "ĐÃ LÊN XE"
          ) {
            arrayTicket.push(item);
          }
        });

        console.log(arrayTicket);
        let arrayDuplicateMapStatus_5 = [];
        let checkIsPickingUp = 0;
        arrayTicket.forEach((item, index) => {
          if (item.mapStatus === "0") {
            countInitial += 1;
          }
          if (item.mapStatus === "5") {
            arrayDuplicateMapStatus_5.push(item);
            countNextDes += 1;
          }
          if (
            item.status.toLocaleUpperCase().trim() === "CHƯA LÊN XE" ||
            item.status.toLocaleUpperCase().trim() === "ĐÃ THANH TOÁN"
          ) {
            checkIsPickingUp += 1;
          }
        });

        if (checkIsPickingUp > 0 && currentLat && currentLong) {
          if (countNextDes > 1) {
            let oldPositionOfShortestDistance = 0;
            let destination = "";
            arrayDuplicateMapStatus_5.forEach((item, index) => {
              if (index === arrayDuplicateMapStatus_5.length - 1) {
                destination += item.mapPickUp;
              } else {
                destination += item.mapPickUp + "%7C";
              }
            });
            console.log(currentLat + "    " + currentLong);
            console.log(destination + "   des");
            let elementsArray = [];
            if (currentLat && currentLong) {
              const responseMap = await fetch(
                `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
              );
              const data = await responseMap.json();
              elementsArray = data.rows[0].elements;
            }
            console.log(elementsArray);
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
            console.log(oldPositionOfShortestDistance + "   old");
            arrayDuplicateMapStatus_5.forEach((item, index) => {
              if (index === oldPositionOfShortestDistance) {
                // navigator.geolocation.getCurrentPosition((position) => {
                //   setCurrentLat(position.coords.latitude);
                //   setCurrentLong(position.coords.longitude);
                // });
                setUserName(item.fullName);
                setUserAddress(item.detailAddressToPickUp);
                setUserPhone(item.phoneNumber);
                setUserLat(item.mapPickUp.split(",")[0]);
                setUserLon(item.mapPickUp.split(",")[1]);
              }
            });
          }

          if (countNextDes === 1) {
            const nextDesInfor = arrayTicket.find(
              (item) => item.mapStatus === "5"
            );
            setUserLat(nextDesInfor.mapPickUp.split(",")[0]);
            setUserLon(nextDesInfor.mapPickUp.split(",")[1]);
            setUserName(nextDesInfor.fullName);
            setUserAddress(nextDesInfor.detailAddressToPickUp);
            setUserPhone(nextDesInfor.phoneNumber);
          }

          if (countInitial === arrayTicket.length) {
            // alert("Yes");
            let oldPositionOfShortestDistance = 0;
            let destination = "";
            console.log(arrayTicket);
            arrayTicket.forEach((item, index) => {
              if (index === arrayTicket.length - 1) {
                destination += item.mapPickUp;
              } else {
                destination += item.mapPickUp + "%7C";
              }
            });
            console.log(currentLat + "    " + currentLong);
            console.log(destination + "   des");
            let elementsArray = [];
            if (currentLat && currentLong) {
              // alert("Ok");
              console.log(currentLat + "    " + currentLong);
              // alert(currentLat + "      " + currentLong);
              const responseMap = await fetch(
                `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
              );
              const data = await responseMap.json();
              console.log(data);
              // elementsArray = data.rows[0].elements;
            }
            console.log(elementsArray);
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
            console.log(oldPositionOfShortestDistance + "   old");
            arrayTicket.forEach((item, index) => {
              if (index === oldPositionOfShortestDistance) {
                // navigator.geolocation.getCurrentPosition((position) => {
                //   setCurrentLat(position.coords.latitude);
                //   setCurrentLong(position.coords.longitude);
                // });
                setUserName(item.fullName);
                setUserAddress(item.detailAddressToPickUp);
                setUserPhone(item.phoneNumber);
                setUserLat(item.mapPickUp.split(",")[0]);
                setUserLon(item.mapPickUp.split(",")[1]);
              }
            });
          }
        }
        if (checkIsPickingUp === 0 && currentLat && currentLong) {
          if (countNextDes > 1) {
            let oldPositionOfShortestDistance = 0;
            let destination = "";
            arrayDuplicateMapStatus_5.forEach((item, index) => {
              if (index === arrayDuplicateMapStatus_5.length - 1) {
                destination += item.mapDrop;
              } else {
                destination += item.mapDrop + "%7C";
              }
            });
            console.log(currentLat + "    " + currentLong);
            console.log(destination + "   des");
            let elementsArray = [];
            if (currentLat && currentLong) {
              const responseMap = await fetch(
                `https://rsapi.goong.io/DistanceMatrix?origins=${currentLat},${currentLong}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
              );
              const data = await responseMap.json();
              elementsArray = data.rows[0].elements;
            }
            console.log(elementsArray);
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
            console.log(oldPositionOfShortestDistance + "   old");
            arrayDuplicateMapStatus_5.forEach((item, index) => {
              if (index === oldPositionOfShortestDistance) {
                // navigator.geolocation.getCurrentPosition((position) => {
                //   setCurrentLat(position.coords.latitude);
                //   setCurrentLong(position.coords.longitude);
                // });
                setUserName(item.fullName);
                setUserAddress(item.detailAddressDropOff);
                setUserPhone(item.phoneNumber);
                setUserLat(item.mapDrop.split(",")[0]);
                setUserLon(item.mapDrop.split(",")[1]);
              }
            });
          }

          if (countNextDes === 1) {
            const nextDesInfor = arrayTicket.find(
              (item) => item.mapStatus === "5"
            );
            setUserName(nextDesInfor.fullName);
            setUserAddress(nextDesInfor.detailAddressDropOff);
            setUserPhone(nextDesInfor.phoneNumber);
            setUserLat(nextDesInfor.mapDrop.split(",")[0]);
            setUserLon(nextDesInfor.mapDrop.split(",")[1]);
          }
        }
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
    // alert(currScheduleId);
    if (currScheduleId !== "" && currentLat && currentLong) {
      // alert("ok 2");
      fetchTicketsInCurrentShedule(currScheduleId);
    }
  }, [currScheduleId, currentLat, currentLong]);

  const fetchAllDataScheduleCurrentDay = async () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setCurrentLat(position.coords.latitude);
    //   setCurrentLong(position.coords.longitude);
    // });
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
      setSchduleId(tempArrayCurrentDay[0].id);
    }
  }, [allDataCurrentDay]);

  useEffect(() => {
    if (preparedScheduleId !== "" && currentLat && currentLong) {
      fetchTicketsInCurrentShedule(preparedScheduleId);
    }
  }, [preparedScheduleId, currentLat, currentLong]);

  const getDistance = async (startLat, startLon, endLat, endLon) => {
    const url = `https://api.maptiler.com/routes/directions/v2/${startLon},${startLat};${endLon},${endLat}?key=4D4kbtoB1PV8gjRJMqgB&steps=false&geometries=geojson`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch route data");
      }

      const data = await response.json();
      const route = data.routes[0];
      const distanceInKm = (route.distance / 1000).toFixed(1);
      console.log("Distance:", distanceInKm);

      setDistance(distanceInKm);
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchGeocode = async (address) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/geocode?address=${address}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
      );
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              if (data.predictions) {
                setSuggestAddress(data.predictions);
              }
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

  const handleSearchInCurrent = async () => {
    fetchGeocode(inputCurrent.trim()).then((data) => {
      if (data) {
        console.log("Coordinates:", data.results[0].geometry.location.lat);
        // setCorsSearchCurrentLat(data.results[0].geometry.location.lat);
        // setCorsSearchCurrentLon(data.results[0].geometry.location.lng);
        setCurrentLat(data.results[0].geometry.location.lat);
        setCurrentLong(data.results[0].geometry.location.lng);
      }
    });

    setUserLat("");
    setUserLon("");
    setVoiceSearchAddress1Lat("");
    setVoiceSearchAddress1Lon("");
    setVoiceSearchAddress2Lat("");
    setVoiceSearchAddress2Lon("");
    setVoiceSearchOnceLat("");
    setVoiceSearchOnceLon("");
    setCorsSearchLat_1("");
    setCorsSearchLon_1("");
    setCorsSearchLat_2("");
    setCorsSearchLon_2("");
  };

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
              if (data.predictions) {
                setSuggestAddressPhase1(data.predictions);
              }
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
              if (data.predictions) {
                setSuggestAddressPhase2(data.predictions);
              }
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
      fetchGeocode(inputPhase1.trim()).then((data) => {
        if (data) {
          console.log("Coordinates:", data.results[0].geometry.location.lat);
          setCorsSearchLat_1(data.results[0].geometry.location.lat);
          setCorsSearchLon_1(data.results[0].geometry.location.lng);
        }
      });
    }

    if (inputPhase2) {
      fetchGeocode(inputPhase2.trim()).then((data) => {
        if (data) {
          console.log("Coordinates:", data.results[0].geometry.location.lat);
          setCorsSearchLat_2(data.results[0].geometry.location.lat);
          setCorsSearchLon_2(data.results[0].geometry.location.lng);
        }
      });
    }
    setUserLat("");
    setUserLon("");
    setCorsSearchCurrentLat("");
    setCorsSearchCurrentLon("");
    setVoiceSearchAddress1Lat("");
    setVoiceSearchAddress1Lon("");
    setVoiceSearchAddress2Lat("");
    setVoiceSearchAddress2Lon("");
    setVoiceSearchOnceLat("");
    setVoiceSearchOnceLon("");
  };

  useEffect(() => {
    console.log(userLat + "   " + userLon + "    userLat and userLon");
  }, [userLat, userLon]);

  const searchByVoice = () => {
    setUserLat("");
    setUserLon("");
    setCorsSearchCurrentLat("");
    setCorsSearchCurrentLon("");
    setVoiceSearchAddress1Lat("");
    setVoiceSearchAddress1Lon("");
    setVoiceSearchAddress2Lat("");
    setVoiceSearchAddress2Lon("");
    setVoiceSearchOnceLat("");
    setVoiceSearchOnceLon("");
    setCorsSearchLat_1("");
    setCorsSearchLon_1("");
    setCorsSearchLat_2("");
    setCorsSearchLon_2("");
    setAddressStartVoice("");
    setAddressEndVoice("");
    setAddressOnceVoice("");
    setCurrentCity("");
    setInforVoice("");
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setCurrentLat(position.coords.latitude);
    //   setCurrentLong(position.coords.longitude);
    // });
    setIsRecording(true);
    recognition.start();
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onerror = (err) => {
    console.error(err);
  };

  recognition.onresult = async (e) => {
    console.log("onresult", e);
    const text = e.results[0][0].transcript;
    setInforVoice(text);
    setIsRecording(false);
    console.log(text);
    // if (currentLat && currentLong) {
    const response = await fetch(
      `https://rsapi.goong.io/Geocode?latlng=${currentLat},${currentLong}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
    );
    const data = await response.json();
    if (data.results[0].compound.province) {
      setCurrentCity(data.results[0].compound.province);
      console.log(data.results[0].compound.province);
    }
    // }
  };

  useEffect(() => {
    if (inforVoice) {
      getAddressSearchVoice();
    }
  }, [inforVoice]);

  const getAddressSearchVoice = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBg4x4lMwU59_atcwAU-h0TuuGfwVQq51Y"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Hãy đưa cho tôi đoạn text của các địa chỉ trong câu sau theo format: địa chỉ 1 && địa chỉ 2. Chỉ đưa đoạn text không nhắn gì thêm, để tôi có thể lấy được đoạn text một cách dễ dàng. Đoạn text như sau: ${inforVoice}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResultSeatchVoice(text);
  };

  useEffect(() => {
    if (resultSearchVoice) {
      if (resultSearchVoice.includes("&")) {
        let tempAddressStartVoice =
          resultSearchVoice.split("&&")[0].trim() + " " + currentCity;
        setAddressStartVoice(tempAddressStartVoice);
        let tempAddressEndVoice =
          resultSearchVoice.split("&&")[1].trim() + " " + currentCity;
        setAddressEndVoice(tempAddressEndVoice);
      } else {
        let tempAddressOnceVoice = resultSearchVoice.trim() + " " + currentCity;
        setAddressOnceVoice(tempAddressOnceVoice);
      }
    }
  }, [resultSearchVoice]);

  useEffect(() => {
    if (addressStartVoice) {
      try {
        const getCoorsStartVoice = async () => {
          const response = await fetch(
            `https://rsapi.goong.io/geocode?address=${addressStartVoice}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
          );
          const data = await response.json();
          if (data) {
            setVoiceSearchAddress1Lat(data.results[0].geometry.location.lat);
            setVoiceSearchAddress1Lon(data.results[0].geometry.location.lng);
          }
        };

        getCoorsStartVoice();
      } catch (error) {
        console.log(error);
      }
    }
  }, [addressStartVoice]);

  useEffect(() => {
    if (addressEndVoice) {
      console.log("end:  " + addressEndVoice);
      try {
        const getCoorsStartVoice = async () => {
          const response = await fetch(
            `https://rsapi.goong.io/geocode?address=${addressEndVoice}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
          );
          const data = await response.json();
          if (data) {
            setVoiceSearchAddress2Lat(data.results[0].geometry.location.lat);
            setVoiceSearchAddress2Lon(data.results[0].geometry.location.lng);
          }
        };
        getCoorsStartVoice();
      } catch (error) {
        console.log(error);
      }
    }
  }, [addressEndVoice]);

  // useEffect(() => {
  //   if (addressOneVoice) {
  //     console.log("end:  " + addressOneVoice);
  //     try {
  //       const getCoorsStartVoice = async () => {
  //         const response = await fetch(
  //           `https://rsapi.goong.io/geocode?address=${addressOneVoice}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
  //         );
  //         const data = await response.json();
  //         if (data) {
  //           setVoiceSearchOnceLat(data.results[0].geometry.location.lat);
  //           setVoiceSearchOnceLon(data.results[0].geometry.location.lng);
  //         }
  //       };

  //       getCoorsStartVoice();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [addressOneVoice]);

  useEffect(() => {
    console.log(voiceSearchAddress1Lat);
    console.log(voiceSearchAddress1Lon);
    console.log(voiceSearchAddress2Lat);
    console.log(voiceSearchAddress2Lon);
  }, [
    voiceSearchAddress1Lat,
    voiceSearchAddress1Lon,
    voiceSearchAddress2Lat,
    voiceSearchAddress2Lon,
  ]);

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

      <div style={{ display: "flex" }}>
        {/* {isRecording ? (
          <FontAwesomeIcon
            icon={faMicrophone}
            beatFade
            style={{
              color: "#ff0000",
              marginTop: "15px",
              height: "30px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faMicrophone}
            style={{
              color: "#B197FC",
              marginTop: "15px",
              height: "30px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={searchByVoice}
          />
        )} */}
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
                  placeholder="Nhập Địa Chỉ Hiện Tại"
                  className={styles.input_box}
                  id="input-box"
                  style={{
                    height: "35px",
                    border: "1px solid grey",
                    fontSize: "15px",
                  }}
                  value={inputCurrent}
                  onChange={(e) => {
                    setIsShowSuggest(true);
                    setInputCurrent(e.target.value);
                    setCorsSearchCurrentLat("");
                    setCorsSearchCurrentLon("");
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
                {/* <Button
                  style={{
                    width: "90px",
                    height: "40px",
                    fontSize: "6px",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={() => {
                    setUserLat("");
                    setUserLon("");
                    setCorsSearchCurrentLat("");
                    setCorsSearchCurrentLon("");
                    setVoiceSearchAddress1Lat("");
                    setVoiceSearchAddress1Lon("");
                    setVoiceSearchAddress2Lat("");
                    setVoiceSearchAddress2Lon("");
                    setVoiceSearchOnceLat("");
                    setVoiceSearchOnceLon("");
                    setCorsSearchLat_1("");
                    setCorsSearchLon_1("");
                    setCorsSearchLat_2("");
                    setCorsSearchLon_2("");
                    setAddressStartVoice("");
                    setAddressEndVoice("");
                    setAddressOnceVoice("");
                    setCurrentCity("");
                    setInforVoice("");
                    fetchTicketsInCurrentShedule(schduleId);
                  }}
                >
                  Xem Theo Lịch Trình
                </Button> */}
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
                  placeholder="Nhập Địa Chỉ Bắt Đầu"
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
                    setCorsSearchLat_1("");
                    setCorsSearchLon_1("");
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
                    setCorsSearchLat_2("");
                    setCorsSearchLon_2("");
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
                {/* <Button
                  style={{
                    width: "90px",
                    height: "40px",
                    fontSize: "8px",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  onClick={() => {
                    setUserLat("");
                    setUserLon("");
                    setCorsSearchCurrentLat("");
                    setCorsSearchCurrentLon("");
                    setVoiceSearchAddress1Lat("");
                    setVoiceSearchAddress1Lon("");
                    setVoiceSearchAddress2Lat("");
                    setVoiceSearchAddress2Lon("");
                    setVoiceSearchOnceLat("");
                    setVoiceSearchOnceLon("");
                    setCorsSearchLat_1("");
                    setCorsSearchLon_1("");
                    setCorsSearchLat_2("");
                    setCorsSearchLon_2("");
                    setAddressStartVoice("");
                    setAddressEndVoice("");
                    setAddressOnceVoice("");
                    setCurrentCity("");
                    setInforVoice("");
                    fetchTicketsInCurrentShedule(schduleId);
                  }}
                >
                  Xem Theo Lịch Trình
                </Button> */}
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
      {voiceSearchAddress1Lat &&
      voiceSearchAddress1Lon &&
      voiceSearchAddress2Lat &&
      voiceSearchAddress2Lon ? (
        <GoongMapWithDirections
          origin={`${voiceSearchAddress1Lat},${voiceSearchAddress1Lon}`}
          destination={`${voiceSearchAddress2Lat},${voiceSearchAddress2Lon}`}
        />
      ) : (
        ""
      )}

      {voiceSearchOnceLat && voiceSearchOnceLon ? (
        <GoongMapWithDirections
          origin={`${currentLat},${currentLong}`}
          destination={`${voiceSearchOnceLat},${voiceSearchOnceLon}`}
        />
      ) : (
        ""
      )}

      {corsSearchCurrentLat && corsSearchCurrentLon ? (
        <GoongMapWithDirections
          origin={`${currentLat},${currentLong}`}
          destination={`${corsSearchCurrentLat},${corsSearchCurrentLon}`}
        />
      ) : (
        ""
      )}

      {corsSearchLat_1 &&
      corsSearchLon_1 &&
      corsSearchLat_2 &&
      corsSearchLon_2 ? (
        <GoongMapWithDirections
          origin={`${corsSearchLat_1},${corsSearchLon_1}`}
          destination={`${corsSearchLat_2},${corsSearchLon_2}`}
        />
      ) : (
        ""
      )}

      {userLat && userLon ? (
        <GoongMapWithDirections
          origin={`${currentLat},${currentLong}`}
          destination={`${userLat},${userLon}`}
          userName={userName}
          userAddress={userAddress}
          userPhone={userPhone}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Map;
