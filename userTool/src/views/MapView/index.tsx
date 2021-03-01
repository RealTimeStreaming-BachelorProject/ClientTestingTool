import React, { useEffect, useState } from "react";
import { useDriverData as useDriverPosition } from "../../hooks/useDriverData";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { iconPerson } from "./customMarker/marker";
import "./customMarker/marker.css";

export default function MapView() {
  const [driverId, setDriverId] = useState("");
  const [packageId, setPackageId] = useState("");
  const { position, error } = useDriverPosition(driverId);

  async function onPackageTracing(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(packageId);
    const PACKAGE_SERVICE_URL = `http://localhost:9001/packages?packageID=${packageId}`;
    const response = await fetch(PACKAGE_SERVICE_URL).then((response) =>
      response.json()
    );

    if (response.status !== 200) {
      // TODO: Handle
      console.error("Package not found");
      return;
    }
    console.log(response);
    // TODO: Display all the data
    if (response.driverID) {
      // Starting driver tracking
      setDriverId(response.driverID);
    }
  }

  if (error)
    return (
      <div>
        <h1>Connection error</h1>
        <p>{error}</p>
      </div>
    );
  return (
    <div>
      {!driverId && (
        <form onSubmit={onPackageTracing}>
          <label htmlFor="">packageID</label>
          <input
            type="text"
            onChange={(e) => setPackageId(e.target.value)}
            value={packageId}
          />
          <button>Set</button>
        </form>
      )}
      {!position && <div>No position yet</div>}
      {position && (
        <MapContainer
          center={position}
          zoom={18}
          style={{ height: "calc(70vh)" }}
        >
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
