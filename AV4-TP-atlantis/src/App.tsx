import { Routes, Route, Navigate } from "react-router-dom";
//import SideBar from "./shared/components/SideBar";
import Dashboard from "./pages/TelaDashboard";
import Clientes from  "./pages/Clientes"
import Reservas from "./pages/Reservas"
import Acomodacoes from "./pages/Acomodacoes"
import Login from "./pages/Login"

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/*<SideBar />*/}

      <div className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/acomodacoes" element={<Acomodacoes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}