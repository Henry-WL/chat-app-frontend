// App.jsx
import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Chat from "./routes/Chat.jsx";
import ErrorPage from "./error-page.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
// import { AuthContext } from "./context/auth-context.jsx";
import authContext, { AuthProvider } from "./context/auth-context.jsx";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes.jsx";

function App() {
  const navigate = useNavigate();

return (
    <AuthProvider>
      <div className="h-screen">
        <NavbarComponent />
        <AuthenticatedRoutes/>
      </div>
      </AuthProvider>

  );
}

export default App;
