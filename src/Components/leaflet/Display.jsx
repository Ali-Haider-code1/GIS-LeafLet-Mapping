import React, { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
} from "react-leaflet";


const Display = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/data");
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          console.log(jsonData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <MapContainer
      center={[51.5, -0.12]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((item, index) => (
        <div key={index}>
          <Marker position={[item["x"], item["y"]]}>
            <Popup>{`Marker ${index + 1}`}</Popup>
                  <Tooltip>Backend Data Result { `${item["x"]}`}</Tooltip>
          </Marker>
          <Circle
            center={[item["x"], item["y"]]}
            radius={400}
            color="grey"
            fillOpacity={0.5}
          />
        </div>
      ))}
    </MapContainer>
  );
};

export default Display;
