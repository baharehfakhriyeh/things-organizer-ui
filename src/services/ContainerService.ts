import Keycloak from "keycloak-js";
import { httpClient } from "./ApiBase";
import type { Container, GetContainerPlanRequestType } from "../types/containerTypes";
import { ApiUri } from "./ApiUri";


export const ContainerService = {
  getContainerList: async (keycloak: Keycloak) => {
    return await httpClient.get<Container[]>(ApiUri.container.getContainerList, keycloak);
  },
  getContainerPlan: async(id: number | null, keycloak: Keycloak)=>{
     const body: GetContainerPlanRequestType  = {
      id: id
    }
    return await httpClient.post<Container[], GetContainerPlanRequestType>(ApiUri.container.getContainerPlan, body, keycloak);
  }

};
