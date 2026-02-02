import { createContext, useState, type ReactNode } from "react";

import {
  MapCategoryValue,
  type MapCategoryType,
} from "../../../types/containerTypes";
import ParentContainerContext, {
  type ParentContainerContextType,
} from "./ParentContainerContext";

type MapProviderProps = {
  children: ReactNode;
};

export const ParentContainerProvider = ({ children }: MapProviderProps) => {
  const [parentContainerId, setParentContainerId] = useState<number | null>(null);
  const initialMapCategory: ParentContainerContextType = {
    parentId: parentContainerId,
    parentContainerHandler: (value: number | null) => {
      setParentContainerId(value);
    },
  };

  return (
    <ParentContainerContext.Provider value={initialMapCategory}>
      {children}
    </ParentContainerContext.Provider>
  );
};

export default ParentContainerProvider;
