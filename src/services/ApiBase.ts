import axios, { type AxiosResponse } from "axios";
import Keycloak from "keycloak-js";
import keycloak from "../components/security/keycloak";
import { EventSourcePolyfill } from "event-source-polyfill";

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

export const sseClient = {
  getStream: (url: string, keycloak: Keycloak, setData: any) => {
    const event = sseApiBase(url, keycloak);
    event.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };
    event.onerror = (error) => {
      if (error.status !== 200) {
        const body = error.catch(() => null);
        throw new CustomError(error.status, body);
      }
    };
    return () => event.close();
  },
};

const sseApiBase = (url: string, keycloak: Keycloak) => {
  refreshToken();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return new EventSourcePolyfill(`${apiUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
  });
};

const apiBase = (keycloak: Keycloak) => {
  refreshToken();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return axios.create({
    baseURL: `${apiUrl}`,
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
  });
};

const sockets: Record<string, WebSocket> = {};

export const wsClient = {
  connectStream: (
    url: string,
    keycloak: Keycloak,
    callback: (data: any) => void
  ) => {
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = `${apiUrl.replace(/^http/, "ws")}${url}`;

    // If socket exists and is OPEN, reuse it
    if (sockets[wsUrl] && sockets[wsUrl].readyState === WebSocket.OPEN) {
      return {
        send: <B>(body: B) => sockets[wsUrl].send(JSON.stringify(body)),
        close: () => sockets[wsUrl].close(),
      };
    }

    // Otherwise create a new one
    const socket = new WebSocket(wsUrl);
    sockets[wsUrl] = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        callback(data);
      } catch (err) {
        console.error("Failed to parse WebSocket message", err);
      }
    };
    socket.onerror = (error) => console.error("WebSocket error", error);
    socket.onclose = () => {
      console.log("WebSocket closed");
      delete sockets[wsUrl];
    };

    return {
      send: <B>(body: B) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(body));
        }
      },
      close: () => socket.close(),
    };
  },
};


const refreshToken = async () =>
  await keycloak.updateToken(Number(import.meta.env.VITE_REFRESH_TOKEN_TIME));

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
