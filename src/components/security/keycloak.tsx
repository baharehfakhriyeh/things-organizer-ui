import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:4080",   // Keycloak base URL
  realm: "thingsorganizerrealm",
  clientId: "thingsorganizer-react"
});

export default keycloak;
