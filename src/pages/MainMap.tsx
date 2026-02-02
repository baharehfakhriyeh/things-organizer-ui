import React, { useContext } from "react";
import ViewOutdoorMap from "../components/container/ViewOutdoorMap";
import ParentContainerContext, {
  type ParentContainerContextType,
} from "../components/container/context/ParentContainerContext";
import ViewIndoorMap from "../components/container/ViewIndoorMap";

const MainMap = () => {
  const parentContainerContext: ParentContainerContextType = useContext(
    ParentContainerContext
  );
  if (parentContainerContext.parentId) {
    console.log("indoor map");
    return <ViewIndoorMap containerId={parentContainerContext.parentId} />;
  }
  console.log("outdoor map");
  return <ViewOutdoorMap />;
};

export default MainMap;
