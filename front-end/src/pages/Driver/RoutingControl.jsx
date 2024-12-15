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
    show: true,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
  });

  instance.on("routesfound", function (e) {
    const route = e.routes[0]; // Get the first route
    console.log((route.summary.totalDistance / 1000).toFixed(1) + " km"); // Set distance in meters

    setTimeout(() => {
      const instructionContainer = document.querySelector(
        ".leaflet-routing-container"
      );

      console.log(instructionContainer);

      if (instructionContainer) {
        instructionContainer.addEventListener("click", (event) => {
          const target = event.target;

          // Example: Log the clicked step
          target.innerText = "abc";
          console.log("Clicked instruction:", target.innerText);
        });
      }
    }, 0.3); // Small delay to ensure DOM is ready
  });

  return instance;
};

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;
