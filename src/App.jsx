// App.jsx
import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Chat from "./routes/Chat.jsx";
import ErrorPage from "./error-page.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
// import { AuthContext } from "./context/auth-context.jsx";
import { AuthProvider } from "./context/auth-context.jsx";

function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <div className="h-screen">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          {/* Define other routes here */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      </AuthProvider>

  );
}

export default App;
