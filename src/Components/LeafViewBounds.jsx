import { MapContainer, TileLayer, useMap, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";

const LeafViewBounds = () => {
  const innerBounds = [
    [49.505, -2.09],
    [53.505, 2.09],
  ];
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];

  const redColor = { color: "red" };
  const whiteColor = { color: "white" };

    const SetBoundsRectangles = () => {
    //   Initally set the map view to outer bound.
    const [bounds, setBounds] = useState(outerBounds);
    const map = useMap(); // Gets the current map instance from the context provided by react-leaflet.

    const innerHandlers = useMemo(
      () => ({
        click() {
          setBounds(innerBounds);
          map.fitBounds(innerBounds);
        },
        }),
        // When ever the map instance change the fucntion will responde and change the map.
      [map]
    );

    const outerHandlers = useMemo(
      () => ({
        click() {
          setBounds(outerBounds);
          map.fitBounds(outerBounds);
        },
      }),
      [map]
    );

    return (
      <>
        <Rectangle
          bounds={outerBounds}
          eventHandlers={outerHandlers}
          pathOptions={bounds === outerBounds ? redColor : whiteColor}
        />
        <Rectangle
          bounds={innerBounds}
          eventHandlers={innerHandlers}
          pathOptions={bounds === innerBounds ? redColor : whiteColor}
        />
      </>
    );
  };

  return (
    <MapContainer
      bounds={outerBounds}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetBoundsRectangles />
    </MapContainer>
  );
};

export default LeafViewBounds;
