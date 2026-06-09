import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Explorar.css'

// Lista de filtros de categoria disponíveis no topo
const filtros = ['Todos', 'Design', 'Idiomas', 'Música', 'Programação', 'Marketing']

// Dados fictícios das categorias - depois virão do backend
const categorias = [
  { id: 1, nome: 'Design',       icone: '🖥️',  pessoas: 118   },
  { id: 2, nome: 'Idiomas',      icone: '🌐',  pessoas: 660   },
  { id: 3, nome: 'Marketing',    icone: '📣',  pessoas: 112   },
  { id: 4, nome: 'Programação',  icone: '💻',  pessoas: 1578  },
]

function ExplorarPage() {
  // Guarda qual filtro está selecionado (começa em "Todos")
  const [filtroAtivo, setFiltroAtivo] = useState('Todos')

  const navigate = useNavigate()

  return (
    <div className="explorar-container">

      {/* Cabeçalho com título e avatar */}
      <div className="explorar-header">
        <h1>Explorar skills</h1>
        <div className="explorar-avatar" onClick={() => navigate('/perfil')}>
          👤
        </div>
      </div>

      {/* Campo de busca */}
      <div className="explorar-busca">
        <input type="text" placeholder="Buscar habilidades ou pessoas..." />
      </div>

      {/* Filtros de categoria - rolam horizontalmente */}
      <div className="explorar-filtros">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            className={`filtro-btn ${filtro === filtroAtivo ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo(filtro)} // atualiza o filtro ao clicar
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* Grid de cards de categoria */}
      <div className="explorar-grid">
        {categorias.map((cat) => (
          <div
            className="categoria-card"
            key={cat.id}
            onClick={() => navigate('/perfil')} // futuramente leva para lista filtrada
          >
            <span className="categoria-icone">{cat.icone}</span>
            <h3>{cat.nome}</h3>
            <span>{cat.pessoas} pessoas</span>
          </div>
        ))}
      </div>

      {/* Navbar inferior */}
      <nav className="explorar-navbar">
        <button className="navbar-item" onClick={() => navigate('/home')}>🏠</button>
        <button className="navbar-item ativo">🔍</button>
        <button className="navbar-item">💬</button>
        <button className="navbar-item" onClick={() => navigate('/perfil')}>👤</button>
      </nav>

    </div>
  )
}

export default ExplorarPage