import { createContext } from 'react'


export type ParentContainerContextType = {
  parentId: number | null;
  parentContainerHandler: (value: number | null) => void;
};

const ParentContainerContext = createContext<ParentContainerContextType>({
  parentId: null,
  parentContainerHandler: () => {}
});

export default ParentContainerContext;
