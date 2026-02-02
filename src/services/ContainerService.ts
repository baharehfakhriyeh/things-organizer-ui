import Keycloak from "keycloak-js";
import { httpClient, sseClient, wsClient } from "./ApiBase";
import type {
  Container,
  FeatureType,
  GeometryType,
  NullableId,
  UpdateContainerLocationReponseType,
  UpdateContainerLocationRequestType,
} from "../types/containerTypes";
import { ApiUri } from "./ApiUri";

export const ContainerService = {
  getContainerList: async (keycloak: Keycloak) => {
    return await httpClient.get<Container[]>(
      ApiUri.container.getContainerList,
      keycloak
    );
  },
  getContainersByParentId: async (id: number | null, keycloak: Keycloak) => {
    const body: NullableId = {
      id: id,
    };
    return await httpClient.post<Container[], NullableId>(
      ApiUri.container.getContainersByParentId,
      body,
      keycloak
    );
  },
  updateContainerLocation: async (
    id: number,
    geometry: GeometryType,
    keycloak: Keycloak
  ) => {
    const body: UpdateContainerLocationRequestType = {
      containerId: id,
      geometry: geometry,
    };
    return await httpClient.put<
      UpdateContainerLocationReponseType,
      UpdateContainerLocationRequestType
    >(ApiUri.container.updateContainerLocation, body, keycloak);
  },
  getContainersLocationInArea: async (
    area: GeometryType,
    keycloak: Keycloak,
    callback: (data: FeatureType) => void
  ) => {
    const ws = wsClient.connectStream(
      ApiUri.container.getContainersInAreaStream,
      keycloak,
      callback
    );

    ws.send(area);
  },
  getContainersLocationByParentId: async (
    parentId: number,
    keycloak: Keycloak,
    callback: (data: FeatureType) => void
  ) => {
    const body:NullableId = {
          id: parentId,
        }
    const ws = wsClient.connectStream(
      ApiUri.container.getContainersLocationByParentId,
      keycloak,
      callback
    );

    ws.send(body);
  },
};
