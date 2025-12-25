import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import keycloak from "./keycloak";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then(() => setInitialized(true));
  }, []);

  if (!initialized) {
    return null; // or a loading screen
  }

  return (
    <AuthContext.Provider value={{ keycloak }}>
      {children}
    </AuthContext.Provider>
  );
}
