import { BrowserRouter, Routes, Route } from 'react-router-dom'

import OnboardingPage from '../pages/Onboarding'
import LoginPage from '../pages/Login'
import HomePage from '../pages/Home'
import ExplorarPage from '../pages/Explorar'
import PerfilPage from '../pages/Perfil'
import MatchPage from '../pages/Match'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<OnboardingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/home"      element={<HomePage />} />
        <Route path="/explorar"  element={<ExplorarPage />} />
        <Route path="/perfil"    element={<PerfilPage />} />
        <Route path="/match"     element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

/* Esse aquivo permite que mostre a pagina de acordo com que o usuario esta navegando. Exemplo: se o usuário estiver no endereço /login, mostra a LoginPage... assim por diante */