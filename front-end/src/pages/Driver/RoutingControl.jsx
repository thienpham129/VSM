import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState } from "react";

const CreateRoutineMachineLayer = ({ position, start, end, color }) => {
  const [distance, setDistance] = useState(0);
  const instance = L.Routing.control({
    position,
    waypoints: [start, end],
    lineOptions: {
      styles: [
        {
          color,
          opacity: 0.8,
          weight: 6,
        },
      ],
    },
    showAlternatives: true,
  });

  instance.on("routesfound", function (e) {
    const route = e.routes[0]; // Get the first route
    console.log((route.summary.totalDistance / 1000).toFixed(1) + " km"); // Set distance in meters
  });

  return instance;
};

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;
