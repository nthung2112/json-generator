import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

// Ace Editor imports
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-error_marker";

// Styles
import "@fontsource/source-sans-pro";
import "remixicon/fonts/remixicon.css";
import "./assets/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
