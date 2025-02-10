import { Routes, Route } from "react-router-dom";
import EmpresaInterface from "./pages/Empresas/Inicio";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<EmpresaInterface />} />
      </Route>
    </Routes>
  );
}

export default App;
