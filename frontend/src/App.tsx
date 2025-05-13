import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const initOptions = {
  url: "http://localhost:8080",
  realm: "master",
  clientId: "account",
};

const kc = new Keycloak(initOptions);

async function login() {
  try {
    await kc.login({
      redirectUri: "http://localhost:5173",
    });
  } catch (error) {
    console.error("Login Failed", error);
  }
}

async function logout() {
  try {
    await kc.logout({
      redirectUri: "http://localhost:5173",
    });
  } catch (error) {
    console.error("Logout Failed", error);
  }
}

function App() {
  const [auth, setAuth] = useState(false);
  async function loadUserProfile() {
    try {
      const user = await kc.loadUserInfo()
      console.log(user);
    } catch (error) {
      console.error("Failed to load user profile", error);
    }
  }

  async function init(){
    try {
      const auth = await kc.init({
        onLoad: "login-required", 
        checkLoginIframe: true,
        pkceMethod: 'S256'
      })
      setAuth(auth);
      console.log(auth);
      console.log(kc);
      console.log(kc.token);
    } catch (error) {
      console.error("Failed to initialize Keycloak", error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (auth) {
      loadUserProfile();
      // Load Chatwoot script when user is authenticated
      loadChatwootScript();
    }
  }, [auth]);

  // Function to dynamically load Chatwoot script
  const loadChatwootScript = () => {
    const BASE_URL = "https://app.chatwoot.com";
    const script = document.createElement("script");
    script.innerHTML = `
      (function (d, t) {
        var BASE_URL = "${BASE_URL}";
        var g = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSDK.run({
            websiteToken: "yGvte1Y7ecSBMxBpMebVZG3Z",
            baseUrl: BASE_URL,
          });
        };
      })(document, "script");
    `;
    document.body.appendChild(script);
  };

  return (
    <div>
      <p>{auth ? "Welcome to Turium AI" : "Please login"}</p>
     {auth ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
    </div>
  );
}

export default App;
