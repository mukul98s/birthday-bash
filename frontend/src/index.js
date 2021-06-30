import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalProvider } from "./State/GlobalState";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <App />
      </Router>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
