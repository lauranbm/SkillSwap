import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

// Interface que define o formato de um usuário vindo do backend
interface IUsuario {
  id: number
  nome: string
  email: string
  cidade: string
  bio: string
  telefone: string
}

// Interface que define o formato de uma habilidade vinda do backend
interface IHabilidade {
  id: number
  titulo: string
  categoria: string
  descricao: string
  trocaDesejada: string
  usuario: {
    id: number
    nome: string
  }
}

// Interface que junta os dados do usuário com suas habilidades
// É o formato que os cards da Home precisam para exibir
interface ICardUsuario {
  id: number
  nome: string
  oferece: string    // habilidade que o usuário tem
  quer: string       // o que ele quer em troca
  categoria: string
}

function HomePage() {
  const navigate = useNavigate()

  // Estado para guardar os cards montados
  const [cards, setCards] = useState<ICardUsuario[]>([])

  // Estado para controlar o loading
  const [carregando, setCarregando] = useState<boolean>(true)

  // Estado para erros
  const [erro, setErro] = useState<string>('')

  // useEffect executa quando o componente carrega
  // Busca usuários e habilidades ao mesmo tempo com Promise.all
  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Promise.all faz as duas chamadas ao mesmo tempo
        // em vez de esperar uma terminar para começar a outra
        const [resUsuarios, resHabilidades] = await Promise.all([
          fetch('http://localhost:8080/usuarios'),
          fetch('http://localhost:8080/habilidades'),
        ])

        // Converte as duas respostas para JSON
        const usuarios: IUsuario[] = await resUsuarios.json()
        const habilidades: IHabilidade[] = await resHabilidades.json()

        // Monta os cards cruzando usuários com suas habilidades
        // Para cada habilidade, cria um card com os dados do usuário
        const cardsCalculados: ICardUsuario[] = habilidades.map(hab => ({
          id: hab.id,
          nome: hab.usuario.nome,
          oferece: hab.titulo,
          quer: hab.trocaDesejada,
          categoria: hab.categoria,
        }))

        setCards(cardsCalculados)
      } catch (error) {
        setErro('Não foi possível carregar os dados.')
      } finally {
        setCarregando(false)
      }
    }

    buscarDados()
  }, [])

  return (
    <div className="home-container">

      {/* Cabeçalho */}
      <div className="home-header">
        <div className="home-saudacao">
          <h1>Olá... ✨</h1>
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

        {/* Loading enquanto busca os dados */}
        {carregando && (
          <p style={{ textAlign: 'center', padding: '20px' }}>
            Carregando...
          </p>
        )}

        {/* Mensagem de erro se a chamada falhar */}
        {erro && (
          <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            {erro}
          </p>
        )}

        {/* Mensagem se não houver habilidades cadastradas */}
        {!carregando && !erro && cards.length === 0 && (
          <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
            Nenhuma troca disponível ainda.
          </p>
        )}

        {/* Lista de cards — um para cada habilidade cadastrada */}
        {cards.map((card) => (
          <div className="troca-card" key={card.id}>
            <div className="troca-card-topo">
              <div className="troca-avatar">👤</div>
              <div className="troca-info">
                <h3>{card.nome} Oferece</h3>
                <p>{card.oferece}</p>
                <span>Tem interesse em: {card.quer}</span>
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