import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-dom";

import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const root = document.getElementById("root");

render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  root
);
