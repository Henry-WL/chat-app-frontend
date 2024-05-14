// App.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Chat from "./routes/Chat.jsx";
import ErrorPage from "./error-page.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        {/* Define other routes here */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
