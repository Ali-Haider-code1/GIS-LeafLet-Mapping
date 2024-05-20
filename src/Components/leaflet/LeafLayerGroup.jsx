import React from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";

const LeafLayer = () => {
  const position = [51.505, -0.09]; // Changed position to London coordinates
  const bounds = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  const fillBoundsOptions = {
    color: "red",
  };

  return (
    <MapContainer
      center={position}
      style={{ width: "100%", height: "100vh" }}
      scrollWheelZoom={false}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={position}
        radius={100}
        pathOptions={fillBoundsOptions}
      />
      <FeatureGroup>
        <Popup>Popup for Feature Group</Popup>
        <Rectangle bounds={bounds} pathOptions={fillBoundsOptions} />
      </FeatureGroup>
    </MapContainer>
  );
};

export default LeafLayer;
