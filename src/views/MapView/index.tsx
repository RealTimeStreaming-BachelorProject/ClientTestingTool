import React, { useEffect, useState } from "react";
import { useDriverData as useDriverPosition } from "./useDriverData";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { iconPerson } from "./customMarker/marker";
import "./customMarker/marker.css";

export default function MapView() {
  const [driverId, setDriverId] = useState("");
  const [tempDriverId, setTempDriverId] = useState("6905a686-cde9-4eb7-9e8d-db7f84ccec84");
  const position = useDriverPosition(driverId);
  return (
    <div>
      {!driverId && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDriverId(tempDriverId);
          }}
        >
          <label htmlFor="">driverId</label>
          <input
            type="text"
            onChange={(e) => setTempDriverId(e.target.value)}
            value={tempDriverId}
          />
          <button>Set</button>
        </form>
      )}
      {!position && <div>No position yet</div>}
      {position && (
        <MapContainer center={position} zoom={18} style={{ height: "100vh" }}>
          <ChangeView center={position} zoom={18} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={iconPerson}></Marker>
        </MapContainer>
      )}
    </div>
  );
}

function ChangeView({ center, zoom }: any) {
  /*
    This component allows to change the center of the map programatically.
    https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
  */
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    const animationSeconds = 1;
    map.flyTo(center, zoom, { duration: animationSeconds });
  }, [center]);
  return null;
}
