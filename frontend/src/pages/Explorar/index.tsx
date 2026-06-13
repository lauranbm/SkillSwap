import { useEffect, useState } from 'react'
import { apiFetch } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './Explorar.css'

// Define o formato de uma habilidade recebida do backend
interface IHabilidade {
  id: number
  titulo: string
  categoria: string
  descricao: string
  trocaDesejada: string
  usuarioId: number
  usuarioNome: string
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
        // Usa apiFetch para enviar o token JWT quando o usuário estiver logado
        const dados = await apiFetch('/habilidades')
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
      habilidade.usuarioNome.toLowerCase().includes(textoBusca)

    const combinaCategoria =
      categoriaAtiva === 'Todos' || habilidade.categoria === categoriaAtiva

    return combinaBusca && combinaCategoria
  })

  function usuarioEstaLogado() {
    return Boolean(localStorage.getItem('token'))
  }

  // Define para onde o botão de voltar deve levar
  function voltar() {
    if (usuarioEstaLogado()) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  async function handleProporTroca(habilidade: IHabilidade) {
    if (!usuarioEstaLogado()) {
      navigate('/login')
      return
    }

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      // Recupera o e-mail do usuário logado a partir do token JWT
      const payload = JSON.parse(atob(token.split('.')[1]))
      const emailLogado = payload.sub

      // Busca o usuário logado para descobrir o ID dele
      const usuarios = await apiFetch('/usuarios')
      const usuarioLogado = usuarios.find((usuario: any) => usuario.email === emailLogado)

      if (!usuarioLogado) {
        setErro('Usuário logado não encontrado.')
        return
      }

      // Busca as habilidades cadastradas pelo usuário logado
      const minhasHabilidades = await apiFetch(`/habilidades/usuario/${usuarioLogado.id}`)

      if (minhasHabilidades.length === 0) {
        setErro('Cadastre pelo menos uma habilidade antes de propor uma troca.')
        return
      }

      // Para manter simples, usamos a primeira habilidade cadastrada pelo usuário logado
      const habilidadeOferecida = minhasHabilidades[0]

      // Cria uma troca real no backend. O backend define o status inicial como PENDENTE.
      const trocaCriada = await apiFetch('/trocas', {
        method: 'POST',
        body: JSON.stringify({
          solicitanteId: usuarioLogado.id,
          destinatarioId: habilidade.usuarioId,
          habilidadeOferecidaId: habilidadeOferecida.id,
          habilidadeDesejadaId: habilidade.id,
        }),
      })

      // Guarda a troca criada para a página Match exibir o status e os dados da proposta
      localStorage.setItem('trocaCriada', JSON.stringify(trocaCriada))

      navigate('/match')
    } catch (error) {
      setErro('Erro ao propor troca. Tente novamente.')
    }
  }

  return (
    <div className="explorar-page">
      {/* Cabeçalho da página pública, mantendo a navegação principal do site */}
      <header className="explorar-topbar">
        <button
          className="explorar-voltar"
          onClick={voltar}
        >
          ← Voltar
        </button>
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
          {usuarioEstaLogado() ? (
            <>
              <button
                className="explorar-btn-link"
                onClick={() => navigate('/perfil')}
              >
                Meu perfil
              </button>

              <button
                className="explorar-btn-primary"
                onClick={() => {
                  localStorage.removeItem('token')
                  navigate('/')
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <button
                className="explorar-btn-link"
                onClick={() => navigate('/login')}
              >
                Entrar
              </button>

              <button
                className="explorar-btn-primary"
                onClick={() => navigate('/cadastro')}
              >
                Criar conta
              </button>
            </>
          )}
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
                    {habilidade.usuarioNome?.charAt(0).toUpperCase() || '?'}
                  </div>
                </div>

                <p className="habilidade-descricao">
                  {habilidade.descricao}
                </p>

                <div className="habilidade-info">
                  <span>Oferecido por</span>
                  <strong>{habilidade.usuarioNome || 'Usuário não informado'}</strong>
                </div>

                <div className="habilidade-info">
                  <span>Deseja aprender</span>
                  <strong>{habilidade.trocaDesejada}</strong>
                </div>

                <button
                  className="habilidade-botao"
                  onClick={() => handleProporTroca(habilidade)}
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