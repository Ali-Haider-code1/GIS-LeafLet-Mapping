import { MapContainer, TileLayer, Pane, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const LeafPane = () => {
  const outer = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];
  const inner = [
    [49.505, -2.09],
    [53.505, 2.09],
  ];

  const BlinkingPane = () => {
    const [blink, setBlink] = useState(true);
    //   This will help to store the interval id and will help to clear the interval after one render.
    //    if we use useState than i will work but it cause one extra render.
    const timeRef = useRef();

    useEffect(() => {
      timeRef.current = setInterval(() => {
        setBlink((prevBlink) => !prevBlink);
      }, 3000);
      return () => {
        clearInterval(timeRef.current);
      };
    }, []);

    return blink ? (
      <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
        <Rectangle bounds={outer} pathOptions={{ color: "cyan" }} />
      </Pane>
    ) : null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <BlinkingPane />
      <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
        <Rectangle bounds={inner} pathOptions={{ color: "yellow" }} />
        <Pane name="purple-rectangle">
          <Rectangle bounds={outer} pathOptions={{ color: "purple" }} />
        </Pane>
      </Pane>
    </MapContainer>
  );
};

export default LeafPane;
