import { useState } from "react";
import type { Container } from "../../types/containerTypes";
import ContainerBoard from "./ContainerBoard";
import { FaAnglesDown, FaAnglesUp, FaEarthAsia } from "react-icons/fa6";
import "./../../app.css";
import "./Container.css";
import ThingList from "../thing/ThingList";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import ViewContainersOnOutdoorMap from "./ViewContainersOnOutdoorMap";
import ContainerItemItems from "./ContainerItemItems";
import ContainerBoardItemInside from "./ContainerBoardItemInside";

type ContainerBoardItemProps = {
  container: Container;
};
const ContainerBoardItem = ({ container }: ContainerBoardItemProps) => {
  const [showInside, setShowInside] = useState<boolean>(false);
  const showInsideHandler = () => {
    setShowInside(!showInside);
  };
  

  return (
    <div key={container.id} className="card container-card">
      <div>
        <p className="font-semibold">{container.title}</p>
        {!showInside && (
          <button
            className="btn-badge-bottom btn-badge-bottom-down"
            onClick={showInsideHandler}
          >
            <FaAnglesDown className="btn-badge-icon btn-badge-icon-down" />
          </button>
        )}
      </div>

      {showInside && (
        <ContainerBoardItemInside key={container.id} container={container} showInsideHandler={showInsideHandler} />
      )}
    </div>
  );
};

export default ContainerBoardItem;


