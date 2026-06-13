import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './Dashboard.css'

type Usuario = {
  id: number
  nome: string
  email: string
}

type Troca = {
  id: number
  solicitanteNome: string
  destinatarioNome: string
  status: string
}

function DashboardPage() {
  const navigate = useNavigate()

  const [totalHabilidades, setTotalHabilidades] = useState(0)
  const [trocasPendentes, setTrocasPendentes] = useState(0)
  const [conexoes, setConexoes] = useState(0)

  useEffect(() => {
    async function carregarResumo() {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        // Recupera o e-mail do usuário logado a partir do token JWT
        const payload = JSON.parse(atob(token.split('.')[1]))
        const emailLogado = payload.sub

        // Busca o usuário logado para descobrir o ID e o nome dele
        const usuarios = await apiFetch('/usuarios')
        const usuarioLogado = usuarios.find((u: Usuario) => u.email === emailLogado)

        if (!usuarioLogado) {
          navigate('/login')
          return
        }

        // Conta as habilidades cadastradas pelo usuário logado
        const minhasHabilidades = await apiFetch(`/habilidades/usuario/${usuarioLogado.id}`)
        setTotalHabilidades(minhasHabilidades.length)

        // Conta as trocas em que o usuário logado participa
        const todasTrocas: Troca[] = await apiFetch('/trocas')

        const minhasTrocas = todasTrocas.filter(
          (troca) =>
            troca.solicitanteNome === usuarioLogado.nome ||
            troca.destinatarioNome === usuarioLogado.nome
        )

        setTrocasPendentes(
          minhasTrocas.filter((troca) => troca.status === 'PENDENTE').length
        )

        setConexoes(
          minhasTrocas.filter(
            (troca) => troca.status === 'ACEITA' || troca.status === 'CONCLUIDA'
          ).length
        )
      } catch (error) {
        console.error('Erro ao carregar resumo do dashboard:', error)
      }
    }

    carregarResumo()
  }, [navigate])

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

      {/* Cards com contagens reais vindas do backend */}
      <section className="dashboard-cards">
        <article className="dashboard-card">
          <span>Minhas habilidades</span>
          <strong>{totalHabilidades}</strong>
          <p>Habilidades cadastradas por você.</p>
        </article>

        <article className="dashboard-card">
          <span>Trocas pendentes</span>
          <strong>{trocasPendentes}</strong>
          <p>Propostas aguardando resposta.</p>
        </article>

        <article className="dashboard-card">
          <span>Conexões</span>
          <strong>{conexoes}</strong>
          <p>Trocas aceitas ou concluídas.</p>
        </article>
      </section>

      {/* Atalhos principais para o usuário navegar pelo sistema */}
      <section className="dashboard-actions">
        <h2>Ações rápidas</h2>

        <div className="dashboard-action-grid">
          <button onClick={() => navigate('/minhas-habilidades')}>
            Minhas habilidades
          </button>

          <button onClick={() => navigate('/explorar')}>
            Explorar habilidades
          </button>

          <button onClick={() => navigate('/perfil')}>
            Meu perfil
          </button>

          <button onClick={() => navigate('/match')}>
            Meus matches
          </button>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage