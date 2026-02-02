import React, { useState } from 'react'
import { MapContainer, SVGOverlay } from 'react-leaflet'
import type { FeatureType } from '../../types/containerTypes';
import ViewContainersOnOutdoorMap from './ViewContainersOnOutdoorMap';
import ViewContainerMarkersOnMap from './ViewContainerMarkersOnMap';
import ViewContainersOnIndoorMap from './ViewContainersOnIndoorMap';

type ViewInsideProps = {
    containerId: number
}
const ViewIndoorMap = ({containerId}:ViewInsideProps) => {
    const [features, setFeatures] = useState<FeatureType[]>([]);
      const centerGeometry: [number, number] = [35.71, 51.35]; //todo: get current location as center
  return (
    <div>
      <MapContainer
        center={centerGeometry}
        zoom={13}
        doubleClickZoom={false}
        className="w-full h-[600px] rounded-lg border border-gray-300 shadow-md"
      >
        {/* <SVGOverlay bounds={}></SVGOverlay> */}
        <ViewContainersOnIndoorMap parentId={containerId} setFeatures={setFeatures} />
        <ViewContainerMarkersOnMap features={features}/>
      </MapContainer>
      <div>Container count: {features.length}</div>
    </div>
  )
}

export default ViewIndoorMap
