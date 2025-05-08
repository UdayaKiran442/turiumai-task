import Keycloak from "keycloak-js"

const initOptions ={
    url: "http://localhost:8080", // Remove /auth for Keycloak 17+
    realm: "turiumai",
    clientId: "account"
}

const kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'check-sso', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)
    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});


function App() {

  return (
    <div>
      <p>{kc.authenticated ? "Welcome to Turium AI" : "Please login"}</p>
      <button onClick={() => kc.login()}>Login</button>
    </div>
  )
}

export default App
