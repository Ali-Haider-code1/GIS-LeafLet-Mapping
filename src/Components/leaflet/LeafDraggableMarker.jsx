import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useMemo, useRef, useState } from "react";

const LeafDraggableMarker = () => {
  const center = [51.54, -0.07];

  const DraggableMarker = () => {
    const [Draggable, setDraggable] = useState(false);
    const [Position, setPosition] = useState(center);

    //  To keep a reference to the marker instance, allowing direct manipulation of the marker.

    const markerRef = useRef(null);
    // useMemo ensures that the event handler object is not recreated on every render, improving performance.
    // The function will recreated only when the dependency is changes.
    const eventHandler = useMemo(
      () => ({
        // This function update the position of marker when the drag ends.
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    // useCallback ensures that the function is not recreated on every render.
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={Draggable}
        eventHandlers={eventHandler}
        position={Position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {Draggable
              ? "Marker is draggable"
              : "click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  };
  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //   For copyright claim this line is added for legal purposes
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //   s subdomain, z zoom level, x x-axis, y y-axis
        />
        <DraggableMarker />
      </MapContainer>
    </>
  );
};
export default LeafDraggableMarker;
