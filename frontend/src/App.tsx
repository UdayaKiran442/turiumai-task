import { useEffect } from "react";
import Keycloak from "keycloak-js";

const initOptions = {
  url: "http://localhost:8080",
  realm: "master",
  clientId: "account",
};

const kc = new Keycloak(initOptions);

kc.init({
  onLoad: "login-required", 
  checkLoginIframe: true,
  pkceMethod: 'S256'
})
  .then((auth) => {
    if (!auth) {
      console.log("Not Authenticated");
    } else {
      /* Remove below logs if you are using this on production */
      console.info("Authenticated");
      console.log("auth", auth);
      console.log("Keycloak", kc);
      console.log("Access Token", kc.token);
      kc.onTokenExpired = () => {
        console.log("token expired");
      };
    }
  })
  .catch((error) => {
    console.error("Authentication Failed", error);
  });

async function login() {
  try {
    await kc.login({
      redirectUri: "http://localhost:5173",
    });
  } catch (error) {
    console.error("Login Failed", error);
  }
}

function App() {
  async function loadUserProfile() {
    try {
      const user = await kc.loadUserInfo()
      console.log(user);
    } catch (error) {
      console.error("Failed to load user profile", error);
    }
  }

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <div>
      <p>{kc.authenticated ? "Welcome to Turium AI" : "Please login"}</p>
      <button onClick={login}>Login</button>
      <p>hello</p>
    </div>
  );
}

export default App;
