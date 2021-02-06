import React, { useState } from "react";
import { useDriverData as useDriverPosition } from "./useDriverData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { iconPerson } from "./customMarker/marker";
import "./customMarker/marker.css";

export default function MapView() {
  const position = useDriverPosition();
  return (
    <div>
      <MapContainer center={position} zoom={18} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={iconPerson}></Marker>
      </MapContainer>
    </div>
  );
}
