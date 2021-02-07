import React, { useState } from "react";
import { useDriverData as useDriverPosition } from "./useDriverData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { iconPerson } from "./customMarker/marker";
import "./customMarker/marker.css";

export default function MapView() {
  const [driverId, setDriverId] = useState("");
  const [tempDriverId, setTempDriverId] = useState("");
  const position = useDriverPosition(driverId);
  return (
    <div>
      {!driverId && (
      <form onSubmit={e => {
        e.preventDefault()
        setDriverId(tempDriverId)
      }}>
        <label htmlFor="">driverId</label>
        <input type="text" onChange={(e) => setTempDriverId(e.target.value)} value={tempDriverId} />
        <button>Set</button>
      </form>
      )}
      {!position && (
        <div>No position yet</div>
      )}
      {position && (
        <MapContainer center={position} zoom={18} style={{ height: "100vh" }}>
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
