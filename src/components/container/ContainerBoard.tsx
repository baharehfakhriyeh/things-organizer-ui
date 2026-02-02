import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import type { Container } from "../../types/containerTypes";
import ContainerBoardItem from "./ContainerBoardItem";
import { ContainerService } from "../../services/ContainerService";

import "./Container.css";

type ContainerBoardPropsTyps = {
  parentId: number | null;
};

const ContainerBoard = ({ parentId }: ContainerBoardPropsTyps) => {
  const { keycloak } = useAuth();
  const [containers, setContainers] = useState<Container[]>([]);
  useEffect(() => {
    const loadContainers = async () => {
      setContainers(
        await ContainerService.getContainersByParentId(parentId, keycloak)
      );
    };
    loadContainers();
  }, []);

  const existContainer = () => containers.length > 0;

  return (
    <>
      {existContainer() && (
        <div className="component-flex-list">
          {containers.map((container) => (
            <ContainerBoardItem container={container}></ContainerBoardItem>
          ))}
        </div>
      )}
    </>
  );
};

export default ContainerBoard;
