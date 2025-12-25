import axios, { type AxiosResponse } from "axios";
import Keycloak from "keycloak-js";


export const httpClient = {
  get: <T>(url: string, keycloak: Keycloak) =>
    apiBase(keycloak)
      .get(url)
      .then((respons) => responseHandler<T>(respons)),

  post: <T, B>(url: string, body: B, keycloak: Keycloak) =>
    apiBase(keycloak)
      .post(url, body)  
      .then((respons) => responseHandler<T>(respons)),

  put: <T, B>(url: string, body: B, keycloak: Keycloak) =>
    apiBase(keycloak)
      .put(url, body)
      .then((respons) => responseHandler<T>(respons)),

  delete: <T>(url: string, keycloak: Keycloak) =>
    apiBase(keycloak)
      .delete(url)
      .then((respons) => responseHandler<T>(respons)),
};

const apiBase = (keycloak: Keycloak) => {
  const refreshToken = async() => await keycloak.updateToken(Number(import.meta.env.VITE_REFRESH_TOKEN_TIME));
  refreshToken();
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  return axios.create({
    baseURL: `${apiUrl}`,
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
  });
};

export const responseHandler = async <T>(response: AxiosResponse) => {
  const responseData = response.data;
  if (response.status !== 200) {
    const body = await responseData.catch(() => null);
    throw new CustomError(responseData.status, body);
  }

  return responseData as Promise<T>;
};

export class CustomError extends Error {
  constructor(status: number, body: unknown) {
    super(`HTTP error ${status}`); //todo: customize errors
  }
}
