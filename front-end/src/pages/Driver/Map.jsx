import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
// import { Button } from "@material-ui/core";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  // base: "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4D4kbtoB1PV8gjRJMqgB",
};

const Map = () => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([16.0544, 108.2022]); //216 duy tan
  const [end, setEnd] = useState([16.0754, 108.2355]); // số 5 sơn trà

  // const CreateRoutineMachineLayer = () => {
  //   const [distance, setDistance] = useState(0);
  //   const instance = L.Routing.control({
  //     position: "topLeft",
  //     waypoints: [start, end],
  //     lineOptions: {
  //       styles: [
  //         {
  //           color,
  //           opacity: 0.8,
  //           weight: 6,
  //         },
  //       ],
  //     },
  //     showAlternatives: true,
  //   });

  //   instance.on("routesfound", function (e) {
  //     const route = e.routes[0]; // Get the first route
  //     console.log((route.summary.totalDistance / 1000).toFixed(2) + " km"); // Set distance in meters
  //   });

  //   return instance;
  // };
  return (
    <>
      <button>test</button>

      <MapContainer
        center={start}
        zoom={13}
        zoomControl={true}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={(map) => setMap(map)}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        <RoutingControl
          position={"topleft"}
          start={start}
          end={end}
          color={"blue"}
        />
        {}
        {/* {createControlComponent(CreateRoutineMachineLayer)} */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;
