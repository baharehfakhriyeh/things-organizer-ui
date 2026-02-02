import React, { useState } from "react";
import ViewContainersOnOutdoorMap from "./ViewContainersOnOutdoorMap";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { FeatureType } from "../../types/containerTypes";

import ViewContainerMarkersOnMap from "./ViewContainerMarkersOnMap";

const ViewOutdoorMap = () => {
  
  const [features, setFeatures] = useState<FeatureType[]>([]);
  const centerGeometry: [number, number] = [35.71, 51.35]; //todo: get current location as center
 

  return (
    <>
      <MapContainer
        center={centerGeometry}
        zoom={13}
        doubleClickZoom={false}
        className="w-full h-[600px] rounded-lg border border-gray-300 shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ViewContainersOnOutdoorMap setFeatures={setFeatures} />
        <ViewContainerMarkersOnMap features={features}/>
      </MapContainer>
      <div>Container count: {features.length}</div>
    </>
  );
};

export default ViewOutdoorMap;
