// import React, { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// const RoutingMap = () => {
//   const startLat = 16.0544; // Example starting latitude (Da Nang, Vietnam)
//   const startLng = 108.2022; // Example starting longitude (Da Nang, Vietnam)
//   const endLat = 16.0754; // Example ending latitude
//   const endLng = 108.2355; // Example ending longitude
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current && startLat && startLng && endLat && endLng) {
//       // Initialize routing control once the map is ready
//       const routeControl = L.Routing.control({
//         waypoints: [
//           L.latLng(startLat, startLng), // Start point
//           L.latLng(endLat, endLng), // End point
//         ],
//         routeWhileDragging: true, // Enable route dragging
//         createMarker: function (i, waypoint, n) {
//           return L.marker(waypoint.latLng, {
//             draggable: true, // Allows dragging the marker
//           });
//         },
//         lineOptions: {
//           styles: [
//             {
//               color: "blue", // Blue color for the route line
//               opacity: 0.8, // Line opacity
//               weight: 6, // Line thickness
//             },
//           ],
//         },
//       }).addTo(mapRef.current);

//       // Fit the map view to the route
//       routeControl.on("routesfound", (e) => {
//         const route = e.routes[0];
//         const bounds = route.getBounds();
//         mapRef.current.fitBounds(bounds); // Adjust map view to show the entire route
//       });

//       // Cleanup the route control on component unmount
//       return () => {
//         routeControl.removeFrom(mapRef.current);
//       };
//     }
//   }, [startLat, startLng, endLat, endLng]);

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <MapContainer
//         center={[startLat, startLng]}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: "100%" }}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance; // Set mapRef only when the map is created
//         }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {/* Marker for Start Point */}
//         <Marker position={[startLat, startLng]}>
//           <Popup>Start Point</Popup>
//         </Marker>
//         {/* Marker for End Point */}
//         <Marker position={[endLat, endLng]}>
//           <Popup>End Point</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default RoutingMap;

// import React, { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";

// const RoutingMap = () => {
//   const startLat = 16.0544; // Example latitude for Da Nang
//   const startLng = 108.2022; // Example longitude for Da Nang
//   const endLat = 16.0754; // Example end latitude
//   const endLng = 108.2355; // Example end longitude
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current && startLat && startLng && endLat && endLng) {
//       // Create routing control once the map is available
//       // const routeControl = L.Routing.control({
//       //   waypoints: [L.latLng(startLat, startLng), L.latLng(endLat, endLng)],
//       //   routeWhileDragging: true,
//       // }).addTo(mapRef.current);

//       const routeControl = L.Routing.control({
//         waypoints: [
//           L.latLng(16.0544, 108.2022), // Start point (Da Nang, Vietnam)
//           L.latLng(16.0754, 108.2355), // End point (Another point in Da Nang)
//         ],
//         routeWhileDragging: true, // Enable route dragging
//         router: L.Routing.osrmv1({
//           serviceUrl: "https://router.project-osrm.org/route/v1", // OSRM routing backend
//         }),
//         createMarker: function (i, waypoint, n) {
//           return L.marker(waypoint.latLng, {
//             draggable: true, // Allows dragging the marker
//           });
//         },
//         lineOptions: {
//           styles: [
//             {
//               color: "blue", // Blue color for the route line
//               opacity: 0.8, // Adjust the opacity of the line
//               weight: 6, // Line thickness
//             },
//           ],
//         },
//       }).addTo(mapRef.current);

//       // Clean up the route control when the component unmounts
//       return () => {
//         routeControl.removeFrom(mapRef.current);
//       };
//     }
//   }, [startLat, startLng, endLat, endLng]);

//   return (
//     <div style={{ height: "500px" }}>
//       <MapContainer
//         center={[startLat, startLng]}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: "100vh" }}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance; // Set mapRef only when the map is created
//         }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[startLat, startLng]}>
//           <Popup>Start Point</Popup>
//         </Marker>
//         <Marker position={[endLat, endLng]}>
//           <Popup>End Point</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default RoutingMap;

// import React, { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";

// // Fix marker icon issues in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const RoutingMachine = ({ waypoints }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);
//   useEffect(() => {
//     if (!map) return;
//     const routingControl = L.Routing.control({
//       waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
//       lineOptions: {
//         styles: [{ color: "#3388ff", weight: 4 }],
//       },
//       createMarker: () => null, // Hide default routing markers
//     });

//     routingControlRef.current = routingControl;
//     routingControl.addTo(map);

//     return () => {
//       if (map && routingControlRef.current) {
//         map.removeControl(routingControlRef.current); // Cleanup routing control
//       }
//     };
//   }, [map, waypoints]);

//   return null;
// };

// const MapWithRoute = () => {
//   // Define points with latitude, longitude, and address
//   const points = [
//     { coords: [16.0596, 108.2022], label: "A", address: "Da Nang Airport" },
//     { coords: [16.0757, 108.223], label: "B", address: "Son Tra District" },
//     { coords: [16.0668, 108.2169], label: "C", address: "Han River Bridge" },
//     { coords: [16.0545, 108.2203], label: "D", address: "Cham Museum" },
//     { coords: [16.0687, 108.2073], label: "E", address: "Dragon Bridge" },
//     { coords: [16.0644, 108.2157], label: "F", address: "Con Market" },
//     { coords: [16.0808, 108.2323], label: "G", address: "My Khe Beach" },
//   ];

//   const markersRef = useRef([]);

//   const handleRemoveMarker = (index) => {
//     const marker = markersRef.current[index];
//     if (marker) {
//       markersRef.current = markersRef.current.filter((_, i) => i !== index);
//       marker.remove();
//     }
//   };

//   return (
//     <MapContainer
//       center={[16.0615, 108.2157]}
//       zoom={14}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {points.map((point, index) => {
//         const marker = (
//           <Marker
//             key={index}
//             position={point.coords}
//             ref={(el) => (markersRef.current[index] = el)}
//           >
//             <Popup>
//               <strong>{point.label}</strong>: {point.address}
//               <button onClick={() => handleRemoveMarker(index)}>Remove</button>
//             </Popup>
//           </Marker>
//         );
//         return marker;
//       })}

//       <RoutingMachine waypoints={points.map((point) => point.coords)} />
//     </MapContainer>
//   );
// };

// export default MapWithRoute;

// import React, { useEffect, useState, useRef } from "react";
// import L from "leaflet";
// import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
// import { Button } from "@mui/material";

// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// // Base map tile:
// const maps = {
//   base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
// };

// const Map = () => {
//   // Save map instance to state here:
//   const [map, setMap] = useState(null);
//   // Save routing machine instance to state here:
//   const [routingMachine, setRoutingMachine] = useState(null);

//   // Start-End point for the routing machine
//   const [start, setStart] = useState([38.9072, -77.0369]);
//   const [end, setEnd] = useState([37.7749, -122.4194]);

//   // Routing machine ref
//   const RoutingMachineRef = useRef(null);

//   // Create the routing-machine instance:
//   useEffect(() => {
//     if (!map) return;
//     if (map) {
//       RoutingMachineRef.current = L.Routing.control({
//         position: "topleft",
//         lineOptions: {
//           styles: [
//             {
//               color: "#757de8",
//             },
//           ],
//         },
//         waypoints: [start, end],
//       });
//       setRoutingMachine(RoutingMachineRef.current);
//     }
//   }, [map]);

//   // Set waypoints when start and end points are updated:
//   useEffect(() => {
//     if (routingMachine) {
//       routingMachine.addTo(map);
//       routingMachine.setWaypoints([start, end]);
//     }
//   }, [routingMachine, start, end]);

//   // Update start and end points on button click:
//   const handleClick = () => {
//     if (start[0] === 38.9072) {
//       setStart([40.7128, -74.006]);
//       setEnd([47.6062, -122.3321]);
//     }
//     if (start[0] === 40.7128) {
//       setStart([38.9072, -77.0369]);
//       setEnd([37.7749, -122.4194]);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleClick}>Click To Change Waypoints</Button>
//       <MapContainer
//         center={[37.0902, -95.7129]}
//         zoom={3}
//         zoomControl={false}
//         style={{ height: "100vh", width: "100%", padding: 0 }}
//         // Set the map instance to state when ready:
//         whenCreated={(map) => setMap(map)}
//       >
//         <LayersControl position="topright">
//           <LayersControl.BaseLayer checked name="Map">
//             <TileLayer
//               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url={maps.base}
//             />
//           </LayersControl.BaseLayer>
//         </LayersControl>
//       </MapContainer>
//     </>
//   );
// };

// export default Map;

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
