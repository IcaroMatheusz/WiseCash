import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
