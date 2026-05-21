import { Routes, Route, Navigate } from "react-router-dom";
//import SideBar from "./shared/components/SideBar";
import Dashboard from "./pages/TelaDashboard";
import Clientes from  "./pages/Clientes"

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/*<SideBar />*/}

      <div className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
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