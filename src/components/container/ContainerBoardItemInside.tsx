import React, { useEffect, useState } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import ContainerItemItems from "./ContainerItemItems";
import type {
  Container,
} from "../../types/containerTypes";
import ViewOutdoorMap from "./ViewOutdoorMap";

type ContainerBoardItemInsideProps = {
  container: Container;
  showInsideHandler: () => void;
};

const ContainerBoardItemInside = ({
  container,
  showInsideHandler,
}: ContainerBoardItemInsideProps) => {
  const [showEditLocation, setShowEditLocation] = useState<boolean>(false);

  const setLocationHandler = () => {
    setShowEditLocation(!showEditLocation);
  };

  return (
    <>
      <button className="bg-red-600" onClick={setLocationHandler}>
        Set Location <MdOutlineAddLocationAlt className="btn-badge-icon" />
      </button>
      {!showEditLocation && (
        <ContainerItemItems
          container={container}
          showInsideHandler={showInsideHandler}
        />
      )}
      {showEditLocation && (
        <>
          <ViewOutdoorMap />
        </>
      )}
    </>
  );
};

export default ContainerBoardItemInside;
