import { Popup } from "react-leaflet";
import {type FeatureType } from "../../types/containerTypes";
import useViewMap from "./context/ParentContainerContext";
import { useContext } from "react";
import ParentContainerContext from "./context/ParentContainerContext";

type ViewContainerInfoPopupProps = {
  feature: FeatureType;
}
const ViewContainerInfoPopup = ({feature}: ViewContainerInfoPopupProps) => {
 // const parentId: unknown = feature?.properties.get("id");
  const parentContainerIdContext = useContext(ParentContainerContext);
  const showInsideHandler = () =>{
    console.log("go inside clicked");
    parentContainerIdContext.parentContainerHandler(10);
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
        <button onClick={showInsideHandler}>Go inside</button>
      </div>
    </Popup>
  );
};

export default ViewContainerInfoPopup;
