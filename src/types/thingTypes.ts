import type { Container } from "./containerTypes";

export type Thing = {
  id: number;
  title: string;
  weight: number;
  container: Container;
}

export type GetThingListByContainerIdRequestType = {
  id: number;
}