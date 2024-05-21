import { click } from "@testing-library/user-event/dist/click";
import React, { useMemo, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

const LeafTooltip = () => {
  const position = [51.505, -0.09]; // Changed position to London coordinates
  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  const fillBoundsOptions = {
    color: "red",
  };

  const multipolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ];

  const TooltipCircle = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const eventHandler = useMemo(() => ({
      click() {
        setClickedCount((clickedCount) => clickedCount + 1);
      },
    }));

    const clickText =
      clickedCount === 0
        ? "Click the circle to change the Text"
        : `CircleClik ${clickedCount}`;
    return (
      <Circle
        radius={100}
        pathOptions={fillBoundsOptions}
        eventHandlers={eventHandler}
        center={position}
      >
        <Tooltip>{clickText}</Tooltip>
      </Circle>
    );
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
      <TooltipCircle />
      <CircleMarker center={[51.51, -0.12]} pathOptions={{ color: "blue" }}>
        <Tooltip> Tooltip for circle</Tooltip>
      </CircleMarker>
      <Marker position={[51.51, -0.09]}>
        <Popup>Marker Popup</Popup>
        <Tooltip>Marker tooltip</Tooltip>
      </Marker>
      <Polygon pathOptions={{ color: "purple" }} positions={multipolygon}>
        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
      </Polygon>
      <Rectangle bounds={rectangle} pathOptions={{ color: "black" }}>
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} interactive>
          interactive Tooltip for Rectangle
        </Tooltip>
      </Rectangle>
    </MapContainer>
  );
};

export default LeafTooltip;
