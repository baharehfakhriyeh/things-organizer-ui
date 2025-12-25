// src/auth/AuthContext.ts
import { createContext, useContext } from "react";
import Keycloak from "keycloak-js";

export interface AuthContextType {
  keycloak: Keycloak;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
