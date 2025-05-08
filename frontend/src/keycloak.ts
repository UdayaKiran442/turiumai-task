import Keycloak from "keycloak-js";

// Singleton pattern to prevent multiple initializations

const keycloakInstance = new Keycloak({
    url: "http://localhost:8080/", // Remove /auth for Keycloak 17+
    realm: "turiumai",
    clientId: "account"
});

export default keycloakInstance;