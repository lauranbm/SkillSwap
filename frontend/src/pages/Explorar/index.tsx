import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Explorar.css'

// Define o formato de uma habilidade recebida do backend
interface IHabilidade {
  id: number
  titulo: string
  categoria: string
  descricao: string
  trocaDesejada: string
  usuario?: {
    id: number
    nome: string
  }
}

function ExplorarPage() {
  const navigate = useNavigate()

  const [habilidades, setHabilidades] = useState<IHabilidade[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarHabilidades() {
      try {
        const resposta = await fetch('http://localhost:8080/habilidades')

        if (!resposta.ok) {
          throw new Error('Erro ao carregar habilidades.')
        }

        const dados = await resposta.json()
        setHabilidades(dados)
      } catch (error) {
        setErro('Não foi possível carregar as habilidades.')
      } finally {
        setCarregando(false)
      }
    }

    buscarHabilidades()
  }, [])

  // Cria a lista de categorias a partir dos dados vindos do backend
  const categorias = ['Todos', ...new Set(habilidades.map((h) => h.categoria))]

  // Filtra as habilidades por texto digitado e por categoria selecionada
  const habilidadesFiltradas = habilidades.filter((habilidade) => {
    const textoBusca = busca.toLowerCase()

    const combinaBusca =
      habilidade.titulo.toLowerCase().includes(textoBusca) ||
      habilidade.descricao.toLowerCase().includes(textoBusca) ||
      habilidade.usuario?.nome.toLowerCase().includes(textoBusca)

    const combinaCategoria =
      categoriaAtiva === 'Todos' || habilidade.categoria === categoriaAtiva

    return combinaBusca && combinaCategoria
  })

  function usuarioEstaLogado() {
    return Boolean(localStorage.getItem('token'))
  }

  function handleProporTroca() {
    if (!usuarioEstaLogado()) {
      navigate('/login')
      return
    }

    navigate('/match')
  }

  return (
    <div className="explorar-page">
      {/* Cabeçalho da página pública, mantendo a navegação principal do site */}
      <header className="explorar-topbar">
        <div className="explorar-logo" onClick={() => navigate('/')}>
          <span className="explorar-logo-icon">✦</span>
          <span>SkillSwap</span>
        </div>

        <nav className="explorar-menu">
          <button onClick={() => navigate('/')}>Início</button>
          <button onClick={() => navigate('/#como-funciona')}>Como funciona</button>
          <button onClick={() => navigate('/#beneficios')}>Benefícios</button>
        </nav>

        <div className="explorar-actions">
          <button className="explorar-btn-link" onClick={() => navigate('/login')}>
            Entrar
          </button>
          <button className="explorar-btn-primary" onClick={() => navigate('/cadastro')}>
            Criar conta
          </button>
        </div>
      </header>

      <main className="explorar-main">
        {/* Apresentação da página */}
        <section className="explorar-hero">
          <span className="explorar-tag">Vitrine de habilidades</span>
          <h1>Explore habilidades disponíveis</h1>
          <p>
            Descubra pessoas dispostas a compartilhar conhecimentos e encontre
            oportunidades para aprender algo novo através da troca.
          </p>
        </section>

        {/* Área de busca e filtros */}
        <section className="explorar-filtros-card">
          <input
            type="text"
            placeholder="Buscar por habilidade, descrição ou pessoa..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div className="explorar-filtros">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className={categoria === categoriaAtiva ? 'ativo' : ''}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>
        </section>

        {/* Conteúdo carregado do backend */}
        {carregando && (
          <p className="explorar-mensagem">Carregando habilidades...</p>
        )}

        {erro && (
          <p className="explorar-mensagem erro">{erro}</p>
        )}

        {!carregando && !erro && habilidadesFiltradas.length === 0 && (
          <p className="explorar-mensagem">
            Nenhuma habilidade encontrada.
          </p>
        )}

        {!carregando && !erro && habilidadesFiltradas.length > 0 && (
          <section className="explorar-grid">
            {habilidadesFiltradas.map((habilidade) => (
              <article className="habilidade-card" key={habilidade.id}>
                <div className="habilidade-card-topo">
                  <div>
                    <span className="habilidade-categoria">
                      {habilidade.categoria}
                    </span>
                    <h2>{habilidade.titulo}</h2>
                  </div>

                  <div className="habilidade-avatar">
                    {habilidade.usuario?.nome?.charAt(0) || 'S'}
                  </div>
                </div>

                <p className="habilidade-descricao">
                  {habilidade.descricao}
                </p>

                <div className="habilidade-info">
                  <span>Oferecido por</span>
                  <strong>{habilidade.usuario?.nome || 'Usuário SkillSwap'}</strong>
                </div>

                <div className="habilidade-info">
                  <span>Deseja aprender</span>
                  <strong>{habilidade.trocaDesejada}</strong>
                </div>

                <button
                  className="habilidade-botao"
                  onClick={handleProporTroca}
                >
                  Propor troca
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default ExplorarPage