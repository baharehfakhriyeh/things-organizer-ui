import React from "react";
import { FaAnglesUp } from "react-icons/fa6";
import ThingList from "../thing/ThingList";
import ContainerPlan from "./ContainerPlan";
import type { Container } from "../../types/containerTypes";

type ContainerItemItemsProps = {
  container: Container;
  showInsideHandler: () => void;
};

const ContainerItemItems = ({
  container,
  showInsideHandler,
}: ContainerItemItemsProps) => {
  return (
    <>
      <ContainerPlan parentId={container.id} />
      <ThingList containerId={container.id} />

      <button
        className="btn-badge-bottom btn-badge-bottom-up"
        onClick={showInsideHandler}
      >
        <FaAnglesUp className="btn-badge-icon btn-badge-icon-up" />
      </button>
    </>
  );
};

export default ContainerItemItems;
