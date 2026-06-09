import { useNavigate } from 'react-router-dom'
import './Home.css'

// Dados fictícios por enquanto - depois virão do backend
const trocas = [
  {
    id: 1,
    nome: 'Mario',
    oferece: 'Inglês',
    quer: 'Violão, piano, fotografia...',
    emoji: '👨🏽',
  },
  {
    id: 2,
    nome: 'Ana',
    oferece: 'Tatuagem',
    quer: 'Inglês, Clareamento den...',
    emoji: '👩🏻',
  },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-container">

      {/* Cabeçalho */}
      <div className="home-header">
        <div className="home-saudacao">
          <h1>Olá... ✨</h1> {/* Retornar o nome do usuário ou saudação melhor */}
        </div>
        <div className="home-avatar" onClick={() => navigate('/perfil')}>
          👤
        </div>
      </div>

      {/* Campo de busca */}
      <div className="home-busca">
        <input type="text" placeholder="Buscar habilidades ou pessoas..." />
      </div>

      {/* Seção de trocas */}
      <div className="home-secao">
        <div className="home-secao-header">
          <h2>Trocas para você</h2>
          <button>Ver todas</button>
        </div>

        {/* Lista de cards */}
        {trocas.map((troca) => (
          <div className="troca-card" key={troca.id}>
            <div className="troca-card-topo">
              <div className="troca-avatar">{troca.emoji}</div>
              <div className="troca-info">
                <h3>{troca.nome} Oferece</h3>
                <p>{troca.oferece}</p>
                <span>Tem interesse em: {troca.quer}</span>
              </div>
            </div>
            <button
              className="troca-botao"
              onClick={() => navigate('/match')}
            >
              Trocar habilidades
            </button>
          </div>
        ))}
      </div>

      {/* Navbar inferior */}
      <nav className="home-navbar">
        <button className="navbar-item ativo">🏠</button>
        <button className="navbar-item" onClick={() => navigate('/explorar')}>🔍</button>
        <button className="navbar-item">💬</button>
        <button className="navbar-item" onClick={() => navigate('/perfil')}>👤</button>
      </nav>

    </div>
  )
}

export default HomePage