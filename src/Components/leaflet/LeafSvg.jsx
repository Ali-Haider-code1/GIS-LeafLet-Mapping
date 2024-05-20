import { MapContainer, SVGOverlay, TileLayer } from "react-leaflet";

const LeafSvg = () => {
  const position = [51.505, -0.09];
  const bounds = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

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
      <SVGOverlay bounds={bounds}>
        <rect x="10" y="0" width="100%" height="100%" fill="blue" />
        <circle cx="20" cy="10" r="5" fill="red" />
        <text x="50%" y="50%" stroke="white">
          text
        </text>
      </SVGOverlay>
    </MapContainer>
  );
};

export default LeafSvg;
