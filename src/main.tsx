import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SettingsProvider } from "./contexts/setting-context.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

function fallbackRender({ error }) {
  return (
    <div role="alert">
      <p>{error.name}</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
      <BrowserRouter>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
