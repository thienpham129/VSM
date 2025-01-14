import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // Goong Maps SDK works with Mapbox
import polyline from "@mapbox/polyline"; // Library to decode polylines
import "@goongmaps/goong-js/dist/goong-js.css";

// Replace these with your Goong API keys
const GOONG_MAPS_API_KEY = "zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo";
const GOONG_MAPS_TILE_API_KEY = "6l8CYCEzYU06Uv8lEOwOeU5FqxuKweaoyrsDu5xJ";

mapboxgl.accessToken = GOONG_MAPS_TILE_API_KEY;

const GoongMapWithDirections = ({
  origin,
  destination,
  userName,
  userAddress,
  userPhone,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Create the map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${GOONG_MAPS_TILE_API_KEY}`,
      center: [105.85, 21.03],
      zoom: 12,
    });

    // Add controls for zoom and rotation
    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  useEffect(() => {
    if (!origin || !destination || !map.current) return;

    const fetchDirections = async () => {
      let popUpText = "";
      if (userName && userAddress && userPhone) {
        popUpText = `Tên: ${userName}<br/>
                     SĐT: ${userPhone}<br/>
                     ĐC: ${userAddress}<br/>`;
      }
      try {
        const response = await fetch(
          `https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=car&api_key=${GOONG_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const encodedPolyline = route.overview_polyline.points;

          // Decode the polyline to get coordinates
          const coordinates = polyline
            .decode(encodedPolyline)
            .map(([lat, lng]) => [lng, lat]);

          // Add a listener to wait for the map's style to load
          map.current.on("load", () => {
            // Add the route as a source to the map
            if (map.current.getSource("route")) {
              map.current.getSource("route").setData({
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates,
                },
              });
            } else {
              map.current.addSource("route", {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates,
                  },
                },
              });

              // Add a line layer to display the route
              map.current.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#000000",
                  "line-width": 4,
                },
              });
            }

            new mapboxgl.Marker({ color: "green" }) // Green marker for the origin
              .setLngLat([origin.split(",")[1], origin.split(",")[0]])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText("Điểm Bắt Đầu")
              )
              .addTo(map.current);
            const destinations = destination.split(";");

            destinations.forEach((dest, index) => {
              const [lat, lng] = dest.split(",").map(Number); // Ensure values are numbers
              if (!isNaN(lat) && !isNaN(lng)) {
                const markerElement = document.createElement("div");
                markerElement.style.backgroundColor = "red";
                markerElement.style.color = "white";
                markerElement.style.width = "40px";
                markerElement.style.height = "40px";
                markerElement.style.borderRadius = "50%";
                markerElement.style.display = "flex";
                markerElement.style.justifyContent = "center";
                markerElement.style.alignItems = "center";
                markerElement.style.fontWeight = "bold";
                markerElement.textContent = `Khách ${index + 1}`;
                markerElement.style.fontSize = "9px";

                // new mapboxgl.Marker({ color: "red" })
                new mapboxgl.Marker(markerElement)

                  .setLngLat([lng, lat]) // Longitude first, then latitude
                  .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setText(
                      `Điểm Đến ${index + 1}`
                    )
                  )
                  .addTo(map.current);
              } else {
                console.error(
                  `Invalid coordinates for destination ${index + 1}: ${dest}`
                );
              }
            });

            // Adjust the map view to fit the route
            const bounds = new mapboxgl.LngLatBounds();
            coordinates.forEach((coord) => bounds.extend(coord));
            map.current.fitBounds(bounds, { padding: 50 });
          });
        } else {
          console.error("No routes found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchDirections();
  }, [origin, destination]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default GoongMapWithDirections;

// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl"; // Goong Maps SDK works with Mapbox
// import polyline from "@mapbox/polyline"; // Library to decode polylines
// import "@goongmaps/goong-js/dist/goong-js.css";

// // Replace these with your Goong API keys
// const GOONG_MAPS_API_KEY = "zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo";
// const GOONG_MAPS_TILE_API_KEY = "6l8CYCEzYU06Uv8lEOwOeU5FqxuKweaoyrsDu5xJ";

// mapboxgl.accessToken = GOONG_MAPS_TILE_API_KEY;

// const GoongMapWithDirections = ({
//   origin,
//   destinations,
//   userName,
//   userAddress,
//   userPhone,
// }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   useEffect(() => {
//     if (map.current) return; // Initialize map only once

//     // Create the map instance
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${GOONG_MAPS_TILE_API_KEY}`,
//       center: [105.85, 21.03],
//       zoom: 12,
//     });

//     // Add controls for zoom and rotation
//     map.current.addControl(new mapboxgl.NavigationControl());
//   }, []);

//   useEffect(() => {
//     if (!origin || !destinations || !map.current) return;

//     const fetchDirections = async () => {
//       let popUpText = "";
//       if (userName && userAddress && userPhone) {
//         popUpText = `Tên: ${userName}<br/>
//                      SĐT: ${userPhone}<br/>
//                      ĐC: ${userAddress}<br/>`;
//       }
//       try {
//         // Join all destinations with semicolons
//         console.log(typeof destinations);
//         const destinationString = destinations.join(";");
//         alert(destinationString);

//         const response = await fetch(
//           `https://rsapi.goong.io/Direction?origin=${origin}&destination=${destinationString}&vehicle=car&api_key=${GOONG_MAPS_API_KEY}`
//         );
//         const data = await response.json();

//         if (data.routes && data.routes.length > 0) {
//           const route = data.routes[0];
//           const encodedPolyline = route.overview_polyline.points;

//           // Decode the polyline to get coordinates
//           const coordinates = polyline
//             .decode(encodedPolyline)
//             .map(([lat, lng]) => [lng, lat]);

//           // Add a listener to wait for the map's style to load
//           map.current.on("load", () => {
//             // Add the route as a source to the map
//             if (map.current.getSource("route")) {
//               map.current.getSource("route").setData({
//                 type: "Feature",
//                 geometry: {
//                   type: "LineString",
//                   coordinates,
//                 },
//               });
//             } else {
//               map.current.addSource("route", {
//                 type: "geojson",
//                 data: {
//                   type: "Feature",
//                   geometry: {
//                     type: "LineString",
//                     coordinates,
//                   },
//                 },
//               });

//               // Add a line layer to display the route
//               map.current.addLayer({
//                 id: "route",
//                 type: "line",
//                 source: "route",
//                 layout: {
//                   "line-join": "round",
//                   "line-cap": "round",
//                 },
//                 paint: {
//                   "line-color": "#000000",
//                   "line-width": 4,
//                 },
//               });
//             }

//             // Add markers for origin and each destination
//             new mapboxgl.Marker({ color: "green" }) // Green marker for the origin
//               .setLngLat([origin.split(",")[1], origin.split(",")[0]])
//               .setPopup(
//                 new mapboxgl.Popup({ offset: 25 }).setText("Điểm Bắt Đầu")
//               )
//               .addTo(map.current);

//             destinations.forEach((destination, index) => {
//               const [lat, lng] = destination.split(",");
//               new mapboxgl.Marker({ color: "red" }) // Red marker for each destination
//                 .setLngLat([lng, lat])
//                 .setPopup(
//                   new mapboxgl.Popup({ offset: 25 }).setHTML(
//                     ` <b> Điểm Đến ${index + 1} </b> <br/>
//                      ${index === destinations.length - 1 ? popUpText : ""}`
//                   )
//                 )
//                 .addTo(map.current);
//             });

//             // Adjust the map view to fit the route
//             const bounds = new mapboxgl.LngLatBounds();
//             coordinates.forEach((coord) => bounds.extend(coord));
//             map.current.fitBounds(bounds, { padding: 50 });
//           });
//         } else {
//           console.error("No routes found in API response:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching directions:", error);
//       }
//     };

//     fetchDirections();
//   }, [origin, destinations]);

//   return (
//     <div>
//       <div
//         ref={mapContainer}
//         style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
//       />
//     </div>
//   );
// };

// export default GoongMapWithDirections;
