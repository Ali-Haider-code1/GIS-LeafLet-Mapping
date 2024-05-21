import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
  } from "react-leaflet";
  import { useState } from "react";
  
  const Leaf = () => {
    const LocationMarker = () => {
      const [position, setPosition] = useState(null);
      const map = useMapEvents({
        click() {
          map.locate();
        },
        locationfound(e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
      });
  
      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      );
    };
  
    return (
      <MapContainer
        scrollWheelZoom={false}
        center={[51.505, -0.09]}
        zoom={13}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //   For copyright claim this line is added for legal purposes
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    );
  };
  
  export default Leaf;
  