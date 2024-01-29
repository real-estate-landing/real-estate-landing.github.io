import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SettingsProvider } from "./contexts/setting-context.tsx";
import { BrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

function FallbackRender() {
  return (
      <Navigate to={'/error'} replace={true}></Navigate>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
    <ErrorBoundary fallbackRender={FallbackRender}>
        <SettingsProvider>
          <App />
        </SettingsProvider>
    </ErrorBoundary>
      </BrowserRouter>
  </React.StrictMode>
);
