import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Listar from "../pages/Listar";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listar" element={<Listar />} />
        </Routes>
      </div>
    </Router>
  );
}
