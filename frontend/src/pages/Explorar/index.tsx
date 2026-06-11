import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Explorar.css'

// Interface que define o formato de uma habilidade vinda do backend
interface IHabilidade {
  id: number
  titulo: string
  categoria: string
  descricao: string
  trocaDesejada: string
}

// Interface para os cards de categoria agrupados
interface ICategoria {
  nome: string
  icone: string
  quantidade: number
}

// Mapa de ícones por categoria
const icones: Record<string, string> = {
  'Design':       '🖥️',
  'Idiomas':      '🌐',
  'Marketing':    '📣',
  'Programação':  '💻',
  'Música':       '🎵',
  'Outros':       '🔧',
}

// Lista de filtros disponíveis
const filtros = ['Todos', 'Design', 'Idiomas', 'Música', 'Programação', 'Marketing']

function ExplorarPage() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos')
  const navigate = useNavigate()

  // Estado para guardar as habilidades vindas do backend
  const [habilidades, setHabilidades] = useState<IHabilidade[]>([])

  // Estado para controlar se está carregando
  const [carregando, setCarregando] = useState<boolean>(true)

  // Estado para guardar mensagem de erro se a chamada falhar
  const [erro, setErro] = useState<string>('')

  // useEffect executa quando o componente carrega na tela
  // É aqui que fazemos a chamada para o backend
  useEffect(() => {
    // Função assíncrona para buscar as habilidades
    const buscarHabilidades = async () => {
      try {
        // Faz a chamada GET para o backend
        const resposta = await fetch('http://localhost:8080/habilidades')

        // Converte a resposta para JSON
        const dados = await resposta.json()

        // Atualiza o estado com os dados recebidos
        setHabilidades(dados)
      } catch (error) {
        // Se der erro, guarda a mensagem
        setErro('Não foi possível carregar as habilidades.')
      } finally {
        // Para de mostrar o loading independente do resultado
        setCarregando(false)
      }
    }

    buscarHabilidades()
  }, []) // [] significa que executa só uma vez quando o componente monta

  // Agrupa as habilidades por categoria e conta quantas tem em cada uma
  const categorias: ICategoria[] = habilidades.reduce((acc, habilidade) => {
    const categoriaExistente = acc.find(c => c.nome === habilidade.categoria)
    if (categoriaExistente) {
      // Se a categoria já existe, incrementa a quantidade
      categoriaExistente.quantidade++
    } else {
      // Se não existe, cria uma nova categoria
      acc.push({
        nome: habilidade.categoria,
        icone: icones[habilidade.categoria] || '🔧',
        quantidade: 1,
      })
    }
    return acc
  }, [] as ICategoria[])

  // Filtra as categorias conforme o filtro ativo
  const categoriasFiltradas = filtroAtivo === 'Todos'
    ? categorias
    : categorias.filter(c => c.nome === filtroAtivo)

  return (
    <div className="explorar-container">

      {/* Cabeçalho */}
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

      {/* Filtros */}
      <div className="explorar-filtros">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            className={`filtro-btn ${filtro === filtroAtivo ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo(filtro)}
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* Conteúdo principal */}
      {carregando ? (
        // Mostra loading enquanto busca os dados
        <p style={{ textAlign: 'center', padding: '20px' }}>
          Carregando habilidades...
        </p>
      ) : erro ? (
        // Mostra erro se a chamada falhar
        <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {erro}
        </p>
      ) : categoriasFiltradas.length === 0 ? (
        // Mostra mensagem se não houver habilidades cadastradas ainda
        <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
          Nenhuma habilidade cadastrada ainda.
        </p>
      ) : (
        // Mostra os cards de categoria
        <div className="explorar-grid">
          {categoriasFiltradas.map((cat) => (
            <div
              className="categoria-card"
              key={cat.nome}
              onClick={() => navigate('/perfil')}
            >
              <span className="categoria-icone">{cat.icone}</span>
              <h3>{cat.nome}</h3>
              <span>{cat.quantidade} habilidade(s)</span>
            </div>
          ))}
        </div>
      )}

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