import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/Login'
import HomePage from '../pages/Home'
import ExplorarPage from '../pages/Explorar'
import PerfilPage from '../pages/Perfil'
import MatchPage from '../pages/Match'
import CadastroPage from '../pages/Cadastro'
import DashboardPage from '../pages/Dashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas principais do sistema.
           Cada rota define qual página será exibida de acordo com a URL acessada. */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/explorar" element={<ExplorarPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes