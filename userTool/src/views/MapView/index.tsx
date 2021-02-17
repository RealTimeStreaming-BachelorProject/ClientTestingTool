import React, { useEffect, useState } from "react";
import { useDriverData as useDriverPosition } from "../../hooks/useDriverData";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { iconPerson } from "./customMarker/marker";
import "./customMarker/marker.css";

export default function MapView() {
  const [packageId, setPackageId] = useState("");
  const [tempPackageId, setTempPackageId] = useState("00310ae8-40fd-4aab-bcd6-c18402d229d1");
  const {position, error} = useDriverPosition(packageId);
  
  if (error) return <div>
    <h1>Connection error</h1>
    <p>{error}</p>
  </div>
  return (
    <div>
      {!packageId && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPackageId(tempPackageId);
          }}
        >
          <label htmlFor="">packageID</label>
          <input
            type="text"
            onChange={(e) => setTempPackageId(e.target.value)}
            value={tempPackageId}
          />
          <button>Set</button>
        </form>
      )}
      {!position && <div>No position yet</div>}
      {position && (
        <MapContainer center={position} zoom={18} style={{ height: "calc(100vh - 80px)" }}>
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
