import { useNavigate } from 'react-router-dom'
import './Match.css'

// Dados fictícios do match - depois virão do backend
const match = {
  pessoa1: {
    nome: 'Ana Clara',
    ensinando: 'Inglês',
    emoji: '👩🏻',
  },
  pessoa2: {
    nome: 'Ceci',
    ensinando: 'Fotografia',
    emoji: '👩🏽',
  },
}

function MatchPage() {
  const navigate = useNavigate()

  return (
    <div className="match-container">

      {/* Título */}
      <h1 className="match-titulo">É um match! 🎉</h1>
      <p className="match-subtitulo">Vocês têm interesses compatíveis!</p>

      {/* Dois avatares lado a lado com ícone de estrela no meio */}
      <div className="match-avatares">

        {/* Pessoa 1 */}
        <div className="match-pessoa">
          <div className="match-foto">{match.pessoa1.emoji}</div>
          <p className="match-pessoa-nome">{match.pessoa1.nome}</p>
          <p className="match-pessoa-label">Ensino</p>
          <p className="match-pessoa-skill">{match.pessoa1.ensinando}</p>
        </div>

        {/* Ícone central de match */}
        <span className="match-icone">✨</span>

        {/* Pessoa 2 */}
        <div className="match-pessoa">
          <div className="match-foto">{match.pessoa2.emoji}</div>
          <p className="match-pessoa-nome">{match.pessoa2.nome}</p>
          <p className="match-pessoa-label">Ensino</p>
          <p className="match-pessoa-skill">{match.pessoa2.ensinando}</p>
        </div>

      </div>

      {/* Botões de ação */}
      <div className="match-botoes">
        <button
          className="match-botao-principal"
          onClick={() => navigate('/home')} // futuramente abre o chat
        >
          Iniciar conversa
        </button>

        <button
          className="match-botao-secundario"
          onClick={() => navigate('/home')} // salva e volta para home
        >
          Salvar para depois
        </button>
      </div>

    </div>
  )
}

export default MatchPage