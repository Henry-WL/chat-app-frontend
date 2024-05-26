// App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent.jsx";
import { AuthProvider } from "./context/auth-context.jsx";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes.jsx";

function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <div className="h-screen">
        <NavbarComponent />
        <AuthenticatedRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
