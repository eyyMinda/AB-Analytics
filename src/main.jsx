import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AbContextProvider } from "./setup/ab-context";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AbContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AbContextProvider>
  </StrictMode>
);
