import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./routes/Login.jsx";
import ErrorPage from "./error-page.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your entire app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);