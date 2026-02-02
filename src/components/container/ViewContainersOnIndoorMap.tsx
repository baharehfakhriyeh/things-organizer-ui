import { useMap } from "react-leaflet";
import type { FeatureType, NullableId, PolygonGeometry } from "../../types/containerTypes";
import { useEffect } from "react";
import { ContainerService } from "../../services/ContainerService";
import keycloak from "../security/keycloak";

type ViewContainersOnIndoorMapProps = {
  parentId: number,
  setFeatures: React.Dispatch<React.SetStateAction<FeatureType[]>>
}

const ViewContainersOnIndoorMap = ({parentId, setFeatures}:ViewContainersOnIndoorMapProps) =>{
  const map = useMap();

  useEffect(() => {
    function handleMove() {
      /* const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const area: PolygonGeometry = {
        type: "Polygon",
        coordinates: [
          [
            [sw.lng, sw.lat],
            [ne.lng, sw.lat],
            [ne.lng, ne.lat],
            [sw.lng, ne.lat],
            [sw.lng, sw.lat],
          ],
        ],
      }; */

      const callbackFunction = (data: FeatureType) => {
        console.log(data);
        setFeatures((prev)=> {
          if(prev.some(item=> item.id === data.id)){
            return [...prev]
          }
          return [...prev, data]
        });
        console.log(data);
      };

      console.log(`parent id : ${parentId}`);
      ContainerService.getContainersLocationByParentId(parentId, keycloak, callbackFunction);
    }

    map.on("moveend", handleMove);
    return () => {
      map.off("moveend", handleMove);
    };
  }, [map]);

  return null;
};

export default ViewContainersOnIndoorMap;
