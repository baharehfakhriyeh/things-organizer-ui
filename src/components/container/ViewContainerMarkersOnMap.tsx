import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { FeatureType } from "../../types/containerTypes";
import houseIconUrl from "@/assets/icons/house-blue.svg";
import ViewContainerInfoPopup from "./ViewContainerInfoPopup";

type ViewContainerMarkersOnMapProps = {
  features: FeatureType[];
};
const ViewContainerMarkersOnMap = ({ features }: ViewContainerMarkersOnMapProps) => {
  const map = useMap();
  const containerIcon = L.icon({
    iconUrl: houseIconUrl, // public path
    iconSize: [32, 32], // width, height
    iconAnchor: [16, 32], // point of the icon that is anchored
    popupAnchor: [0, -32], // popup position
  });
  return (
    <div>
      {features &&
        features.length > 0 &&
        features.map(
          (feature, index) =>
            feature.geometry.type === "Point" && (
              <Marker
                key={feature.id}
                icon={containerIcon}
                position={[
                  feature.geometry.coordinates[1], // latitude
                  feature.geometry.coordinates[0], // longitude
                ]}
                eventHandlers={{
                  dblclick: (e) => {
                    if (feature.geometry.type === "Point") {
                      map.flyTo(
                        [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
                        Math.max(map.getZoom() + 2, 16),
                        {
                          animate: true,
                          duration: 0.5,
                        }
                      );
                    }
                  },
                }}
              >
                <ViewContainerInfoPopup feature={feature}/>
              </Marker>
            )
        )}
    </div>
  );
};

export default ViewContainerMarkersOnMap;
