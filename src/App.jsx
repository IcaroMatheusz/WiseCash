import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";
import Extrato from "./pages/Extrato";
import Categorias from "./pages/Categorias";
import Configuracoes from "./pages/Configuracoes";
import { AuthProvider } from "./context/AuthContext";

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login /> }/>
          <Route path="/register" element={<Register />}/>
          <Route path="/extrato" element={<Extrato />}/>
          <Route path="/categorias" element={<Categorias />}/>
          <Route path='/configuracoes' element={< Configuracoes/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;