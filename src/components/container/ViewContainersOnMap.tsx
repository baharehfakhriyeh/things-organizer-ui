import { useMap } from "react-leaflet";
import type { FeatureType, PolygonGeometry } from "../../types/containerTypes";
import { useEffect } from "react";
import { ContainerService } from "../../services/ContainerService";
import keycloak from "../security/keycloak";

type ViewContainersOnMapProps = {
  parentId?: number | null,
  setFeatures: React.Dispatch<React.SetStateAction<FeatureType[]>>
}

const ViewContainersOnMap = ({parentId, setFeatures}:ViewContainersOnMapProps) =>{
  const map = useMap();

  useEffect(() => {
    function handleMove() {
      const bounds = map.getBounds();
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
      };

      const callbackFunction = (data: FeatureType) => {
        setFeatures((prev)=> {
          if(prev.some(item=> item.id === data.id)){
            return [...prev]
          }
          return [...prev, data]
        });
        console.log(data);
      };
      
      if(parentId == null){
        ContainerService.getContainersInArea(area, keycloak, callbackFunction);
      }else{
        ContainerService.getContainersByParentId(parentId, keycloak);
      }
      
    }

    map.on("moveend", handleMove);
    return () => {
      map.off("moveend", handleMove);
    };
  }, [map]);

  return null;
};

export default ViewContainersOnMap;
