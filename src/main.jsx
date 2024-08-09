import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { LanguageProvider } from "./MultiLanguge/LanguageProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
       <App />
    </LanguageProvider>
  </React.StrictMode>
);
