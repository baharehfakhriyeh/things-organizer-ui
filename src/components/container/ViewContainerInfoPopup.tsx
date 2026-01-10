import React from "react";
import { Popup } from "react-leaflet";
import type { FeatureType } from "../../types/containerTypes";
import { formatWithOptions } from "util";

type ViewContainerInfoPopupProps = {
  feature: FeatureType;
}
const ViewContainerInfoPopup = ({feature}: ViewContainerInfoPopupProps) => {
  const showInsideHandler = () =>{
    
  }
  return (
    <Popup>
      <div className="min-w-[200px]">
        <span className="flex row justify-between">
          <h3 className="font-semibold text-lg">{feature.description}</h3>
          <button onClick={() => null}>Edit</button>
        </span>
        

        <p className="text-sm text-gray-600">
          Location: {feature.geometry.coordinates[0]} {feature.geometry.coordinates[1]}
        </p>

        <p className="mt-2">{feature.timestamp}</p>
        <button onClick={showInsideHandler}>Show inside</button>
      </div>
    </Popup>
  );
};

export default ViewContainerInfoPopup;
