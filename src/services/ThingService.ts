import Keycloak from "keycloak-js";
import { httpClient } from "./ApiBase";
import {
  type GetThingListByContainerIdRequestType,
  type Thing,
} from "../types/thingTypes";
import { ApiUri } from "./ApiUri";

export const ThingService = {
  getThingsByContainerId: async (id: number, keycloak: Keycloak) => {
    const body: GetThingListByContainerIdRequestType = {
      id: id,
    };
    return await httpClient.post<Thing[], GetThingListByContainerIdRequestType>(
      ApiUri.thing.getThingsByContainerId,
      body,
      keycloak
    );
  },
  
};
