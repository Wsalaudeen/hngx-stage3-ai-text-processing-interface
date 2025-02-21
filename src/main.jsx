import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const originMeta = document.createElement("meta");
originMeta.httpEquiv = "origin-trial";
originMeta.content = import.meta.env.VITE_TRANSLATOR_TOKEN;
document.head.append(originMeta);

const orgMeta = document.createElement("meta");
orgMeta.httpEquiv = "origin-trial";
orgMeta.content = import.meta.env.VITE_DETECTOR_TOKEN;
document.head.append(orgMeta);

const oMeta = document.createElement("meta");
oMeta.httpEquiv = "origin-trial";
oMeta.content = import.meta.env.VITE_SUMMARY_TOKEN;
document.head.append(oMeta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
