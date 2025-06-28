import { Routes, Route } from "react-router-dom";
import EmpresaInterface from "./pages/Empresas/Inicio";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import AgendamentosInterface from "./pages/Agendamentos/inicio";
import PacienteInterface from "./pages/Pacientes/Inicio";
import ValoresInterface from "./pages/Valores/inicio";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<EmpresaInterface />} />
        <Route path="/agendamentos" element={<AgendamentosInterface />} />
        <Route path="/paciente" element={<PacienteInterface />} />
        <Route path="/valores" element={<ValoresInterface />} />
      </Route>
    </Routes>
  );
}

export default App;
