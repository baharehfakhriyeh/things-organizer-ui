import { useState } from "react";
import type { Container } from "../../types/containerTypes";
import ContainerPlan from "./ContainerPlan";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import "./../../app.css";
import "./Container.css";
import ThingList from "../thing/ThingList";

type OnDropSub = (draggedId: number, newParentId: number) => void;
type ContainerPlanItemProps = {
  container: Container;
  onDropHandler: OnDropSub;
};
const ContainerPlanItem = ({
  container,
  onDropHandler,
}: ContainerPlanItemProps) => {
  const [showInside, setShowInside] = useState<boolean>(false);
  const showInsideHandler = () => {
    setShowInside(!showInside);
  };

  return (
    <div key={container.id} className="card container-card">
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("containerId", container.id.toString());
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const draggedId = parseInt(e.dataTransfer.getData("containerId"));
          onDropHandler(draggedId, container.id);
        }}
      >
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
        <div>
          <ContainerPlan parentId={container.id} />
          <ThingList containerId={container.id} />
          <button
            className="btn-badge-bottom btn-badge-bottom-up"
            onClick={showInsideHandler}
          >
            <FaAnglesUp className="btn-badge-icon btn-badge-icon-up" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContainerPlanItem;
