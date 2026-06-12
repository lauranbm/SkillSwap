import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function DashboardPage() {
  const navigate = useNavigate()

  function sair() {
    // Remove o token JWT salvo no login e retorna para a página inicial
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-tag">Área logada</span>
          <h1>Bem-vindo ao SkillSwap</h1>
          <p>Gerencie suas habilidades, explore trocas e acompanhe suas conexões.</p>
        </div>

        <button className="dashboard-sair" onClick={sair}>
          Sair
        </button>
      </header>

      {/* Cards de resumo visual da área logada */}
      <section className="dashboard-cards">
        <article className="dashboard-card">
          <span>Minhas habilidades</span>
          <strong>0</strong>
          <p>Habilidades cadastradas por você.</p>
        </article>

        <article className="dashboard-card">
          <span>Trocas pendentes</span>
          <strong>0</strong>
          <p>Propostas aguardando resposta.</p>
        </article>

        <article className="dashboard-card">
          <span>Conexões</span>
          <strong>0</strong>
          <p>Trocas aceitas ou concluídas.</p>
        </article>
      </section>

      {/* Atalhos principais para o usuário navegar pelo sistema */}
      <section className="dashboard-actions">
        <h2>Ações rápidas</h2>

        <div className="dashboard-action-grid">
          <button onClick={() => navigate('/explorar')}>
            Explorar habilidades
          </button>

          <button onClick={() => navigate('/perfil')}>
            Meu perfil
          </button>

          <button onClick={() => navigate('/match')}>
            Ver trocas
          </button>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage