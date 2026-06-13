import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './MinhasHabilidades.css'

type Usuario = {
  id: number
  nome: string
  email: string
}

type Habilidade = {
  id: number
  titulo: string
  descricao: string
  categoria: string
  trocaDesejada: string
}

function MinhasHabilidadesPage() {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [habilidades, setHabilidades] = useState<Habilidade[]>([])

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [trocaDesejada, setTrocaDesejada] = useState('')

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(true)

  async function carregarDados() {
    try {
      const token = localStorage.getItem('token')

      // Se não tiver token, o usuário volta para o login
      if (!token) {
        navigate('/login')
        return
      }

      // Recupera o e-mail salvo dentro do token JWT
      const payload = JSON.parse(atob(token.split('.')[1]))
      const emailLogado = payload.sub

      // Busca todos os usuários e encontra o usuário logado pelo e-mail
      const usuarios = await apiFetch('/usuarios')
      const usuarioLogado = usuarios.find((u: Usuario) => u.email === emailLogado)

      if (!usuarioLogado) {
        setErro('Usuário logado não encontrado.')
        return
      }

      setUsuario(usuarioLogado)

      // Busca somente as habilidades cadastradas pelo usuário logado
      const minhasHabilidades = await apiFetch(`/habilidades/usuario/${usuarioLogado.id}`)
      setHabilidades(minhasHabilidades)
    } catch (error) {
      setErro('Erro ao carregar suas habilidades.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  async function cadastrarHabilidade() {
    if (!usuario) {
      setErro('Usuário não encontrado.')
      return
    }

    if (!titulo || !descricao || !categoria || !trocaDesejada) {
      setErro('Preencha todos os campos para cadastrar a habilidade.')
      return
    }

    setErro('')
    setSucesso('')

    try {
      // Envia a nova habilidade para o backend usando o usuário logado
      await apiFetch('/habilidades', {
        method: 'POST',
        body: JSON.stringify({
          titulo,
          descricao,
          categoria,
          trocaDesejada,
          usuarioId: usuario.id,
        }),
      })

      setSucesso('Habilidade cadastrada com sucesso!')

      setTitulo('')
      setDescricao('')
      setCategoria('')
      setTrocaDesejada('')

      carregarDados()
    } catch (error) {
      setErro('Erro ao cadastrar habilidade.')
    }
  }

  return (
    <div className="minhas-page">
      <header className="minhas-header">
        <button className="minhas-voltar" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>
      </header>

      <main className="minhas-main">
        <section className="minhas-hero">
          <span className="minhas-tag">Área logada</span>
          <h1>Minhas habilidades</h1>
          <p>
            Cadastre as habilidades que você pode ensinar e informe o que deseja
            aprender em troca.
          </p>
        </section>

        <section className="minhas-form-card">
          <h2>Cadastrar nova habilidade</h2>

          <div className="minhas-form-grid">
            <input
              type="text"
              placeholder="Título da habilidade"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <input
              type="text"
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />

            <input
              type="text"
              placeholder="O que deseja aprender?"
              value={trocaDesejada}
              onChange={(e) => setTrocaDesejada(e.target.value)}
            />

            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {erro && <p className="minhas-erro">{erro}</p>}
          {sucesso && <p className="minhas-sucesso">{sucesso}</p>}

          <button className="minhas-botao" onClick={cadastrarHabilidade}>
            Cadastrar habilidade
          </button>
        </section>

        <section className="minhas-lista-card">
          <h2>Habilidades cadastradas</h2>

          {carregando && <p className="minhas-mensagem">Carregando...</p>}

          {!carregando && habilidades.length === 0 && (
            <p className="minhas-mensagem">
              Você ainda não cadastrou nenhuma habilidade.
            </p>
          )}

          <div className="minhas-grid">
            {habilidades.map((habilidade) => (
              <article className="minha-habilidade-card" key={habilidade.id}>
                <span>{habilidade.categoria}</span>
                <h3>{habilidade.titulo}</h3>
                <p>{habilidade.descricao}</p>

                <div>
                  <small>Deseja aprender</small>
                  <strong>{habilidade.trocaDesejada}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default MinhasHabilidadesPage