import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { worker } from "./__ignore__/browser.js";
import "./index.css";

await worker.start();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
