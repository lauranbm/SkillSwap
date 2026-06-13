import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './Match.css'

type Usuario = {
  id: number
  nome: string
  email: string
  telefone: string | null
}

type Troca = {
  id: number
  solicitanteNome: string
  destinatarioNome: string
  habilidadeOferecidaTitulo: string
  habilidadeDesejadaTitulo: string
  status: string
}

function MatchPage() {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [trocas, setTrocas] = useState<Troca[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregarTrocas() {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      const payload = JSON.parse(atob(token.split('.')[1]))
      const emailLogado = payload.sub

      const usuariosCarregados = await apiFetch('/usuarios')
      setUsuarios(usuariosCarregados)

      const usuarioLogado = usuariosCarregados.find(
        (u: Usuario) => u.email === emailLogado
      )

      if (!usuarioLogado) {
        setErro('Usuário logado não encontrado.')
        return
      }

      setUsuario(usuarioLogado)

      const todasTrocas: Troca[] = await apiFetch('/trocas')

      const minhasTrocas = todasTrocas.filter(
        (troca) =>
          troca.solicitanteNome === usuarioLogado.nome ||
          troca.destinatarioNome === usuarioLogado.nome
      )

      setTrocas(minhasTrocas)
    } catch (error) {
      setErro('Não foi possível carregar seus matches.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarTrocas()
  }, [])

  async function aceitarTroca(trocaId: number) {
    try {
      await apiFetch(`/trocas/${trocaId}/aceitar`, {
        method: 'PUT',
      })

      carregarTrocas()
    } catch (error) {
      setErro('Erro ao aceitar a troca.')
    }
  }

  async function recusarTroca(trocaId: number) {
    try {
      await apiFetch(`/trocas/${trocaId}/recusar`, {
        method: 'PUT',
      })

      carregarTrocas()
    } catch (error) {
      setErro('Erro ao recusar a troca.')
    }
  }

  async function concluirTroca(trocaId: number) {
    try {
      await apiFetch(`/trocas/${trocaId}/concluir`, {
        method: 'PUT',
      })

      carregarTrocas()
    } catch (error) {
      setErro('Erro ao concluir a troca.')
    }
  }

  function buscarUsuarioPorNome(nome: string) {
    return usuarios.find((u) => u.nome === nome)
  }

  return (
    <div className="match-page">
      <header className="match-header">
        <button className="match-voltar" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>
      </header>

      <main className="match-main">
        <section className="match-hero">
          <span className="match-tag">Meus matches</span>
          <h1>Propostas de troca</h1>
          <p>
            Acompanhe as trocas criadas ou recebidas por você e veja o status
            atual de cada proposta.
          </p>
        </section>

        {carregando && (
          <div className="match-message-card">
            <p>Carregando matches...</p>
          </div>
        )}

        {erro && (
          <div className="match-message-card">
            <h1>Erro</h1>
            <p>{erro}</p>
          </div>
        )}

        {!carregando && !erro && trocas.length === 0 && (
          <div className="match-message-card">
            <h1>Nenhuma troca encontrada</h1>
            <p>
              Você ainda não possui propostas de troca. Acesse Explorar
              habilidades para propor uma troca.
            </p>
            <button onClick={() => navigate('/explorar')}>
              Explorar habilidades
            </button>
          </div>
        )}

        {!carregando && !erro && trocas.length > 0 && (
          <section className="matches-lista">
            {trocas.map((troca) => {
              const euSouDestinatario = usuario?.nome === troca.destinatarioNome
              const euSouSolicitante = usuario?.nome === troca.solicitanteNome

              const trocaPendente = troca.status === 'PENDENTE'
              const trocaAceita = troca.status === 'ACEITA'
              const trocaConcluida = troca.status === 'CONCLUIDA'

              const solicitante = buscarUsuarioPorNome(troca.solicitanteNome)
              const destinatario = buscarUsuarioPorNome(troca.destinatarioNome)

              return (
                <article className="match-list-card" key={troca.id}>
                  <div className="match-list-header">
                    <div>
                      <span className="match-list-label">Troca #{troca.id}</span>
                      <h2>
                        {troca.solicitanteNome} → {troca.destinatarioNome}
                      </h2>
                    </div>

                    <span className={`status-badge status-${troca.status.toLowerCase()}`}>
                      {troca.status}
                    </span>
                  </div>

                  <div className="match-list-grid">
                    <div className="match-info">
                      <span>Habilidade oferecida</span>
                      <strong>{troca.habilidadeOferecidaTitulo}</strong>
                    </div>

                    <div className="match-info">
                      <span>Habilidade desejada</span>
                      <strong>{troca.habilidadeDesejadaTitulo}</strong>
                    </div>
                  </div>

                  {euSouDestinatario && trocaPendente && (
                    <div className="match-card-actions">
                      <button
                        className="match-accept-btn"
                        onClick={() => aceitarTroca(troca.id)}
                      >
                        Aceitar proposta
                      </button>

                      <button
                        className="match-reject-btn"
                        onClick={() => recusarTroca(troca.id)}
                      >
                        Recusar proposta
                      </button>
                    </div>
                  )}

                  {(trocaAceita || trocaConcluida) && (
                    <div className="match-contact-card">
                      <h3>Dados de contato liberados</h3>

                      <div className="match-contact-grid">
                        <div>
                          <span>{troca.solicitanteNome}</span>
                          <p>E-mail: {solicitante?.email || 'Não informado'}</p>
                          <p>Telefone: {solicitante?.telefone || 'Não informado'}</p>
                        </div>

                        <div>
                          <span>{troca.destinatarioNome}</span>
                          <p>E-mail: {destinatario?.email || 'Não informado'}</p>
                          <p>Telefone: {destinatario?.telefone || 'Não informado'}</p>
                        </div>
                      </div>

                      {trocaAceita && euSouSolicitante && (
                        <button
                          className="match-conclude-btn"
                          onClick={() => concluirTroca(troca.id)}
                        >
                          Concluir troca
                        </button>
                      )}

                      {trocaConcluida && (
                        <p className="match-concluded-message">
                          Troca concluída com sucesso.
                        </p>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </section>
        )}

        <section className="match-actions">
          <button className="match-btn-primary" onClick={() => navigate('/explorar')}>
            Explorar mais habilidades
          </button>

          <button className="match-btn-secondary" onClick={() => navigate('/dashboard')}>
            Voltar ao Dashboard
          </button>
        </section>
      </main>
    </div>
  )
}

export default MatchPage