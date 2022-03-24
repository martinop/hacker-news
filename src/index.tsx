import React from "react";
import ReactDOM from "react-dom";

import App from "./app-main";
import { FavoritesContextProvider } from "./context/favorites";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <FavoritesContextProvider>
      <App />
    </FavoritesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
