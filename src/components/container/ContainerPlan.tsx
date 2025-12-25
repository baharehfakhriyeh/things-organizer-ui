import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import type { Container } from "../../types/containerTypes";
import ContainerPlanItem from "./ContainerPlanItem";
import { ContainerService } from "../../services/ContainerService";
import "./../../app.css";
import "./Container.css";

type ContainerPlanPropsTyps = {
  parentId: number | null;
};

const ContainerPlan = ({ parentId }: ContainerPlanPropsTyps) => {
  const { keycloak } = useAuth();
  const [containers, setContainers] = useState<Container[]>([]);
  useEffect(() => {
    const loadContainers = async () => {
      setContainers(
        await ContainerService.getContainerPlan(parentId, keycloak)
      );
    };
    loadContainers();
  }, []);

  const existContainer = () => containers.length > 0;

  const onDropHandler = (draggedContainerId: number, newParentId: number) => {
    setContainers((prev) =>
      prev.map((container) =>
        container.id === draggedContainerId ? { ...container, parentId: newParentId } : container
      )
    );
  };

  return (
    <>
      {existContainer() && (
        <div className="component-flex-list">
          {containers.map((container) => (
            <ContainerPlanItem container={container} onDropHandler={onDropHandler}></ContainerPlanItem>
          ))}
        </div>
      )}
    </>
  );
};

export default ContainerPlan;
