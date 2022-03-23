import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import App from "./app";

import "./index.css";

dayjs.extend(relativeTime);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
