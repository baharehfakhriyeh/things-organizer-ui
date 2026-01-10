import { timeStamp } from "console"

export type Container = {
    id: number
    title: string
    parent?: Container | null
}

export type NullableId = {
    id?: number | null;
}

export type UpdateContainerLocationRequestType = {
    containerId: number;
    geometry: GeometryType;
}

export type PointGeometry = { 
    type: "Point";
    coordinates: [number, number];
}

export type PolygonGeometry = {
  type: "Polygon";
  coordinates: [ [number, number][] ]; 
};

export type GeometryType = PointGeometry | PolygonGeometry;

export type UpdateContainerLocationReponseType = { 
    id: string;
}

export type ContainerLocationType = {
    containerId: number;
    geometry: GeometryType;
    timestamp: timeStamp;
}

export type FeatureType = {
  id: string;
  owner: string;
  description: string;
  geometry: GeometryType;
  timestamp: string
  properties: Map<string, object>
}

