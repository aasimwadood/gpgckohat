import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import "./src/styles/globals.css";
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found. Ensure index.html contains <div id=\"root\"></div>");
}

createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);