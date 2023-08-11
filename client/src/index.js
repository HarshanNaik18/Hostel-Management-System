import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AdminAuthContextProvider } from "./ContextAPI/AdminAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AdminAuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AdminAuthContextProvider>
);
