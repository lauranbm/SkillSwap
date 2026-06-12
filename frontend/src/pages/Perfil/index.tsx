import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './Perfil.css'
import avatarDefault from '../../assets/avatar-default.png'

type Usuario = {
    id: number
    nome: string
    telefone: string | null
    email: string
    cidade: string
    bio: string
}

function PerfilPage() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const token = localStorage.getItem('token')

                // Se não existir token, o usuário não está autenticado
                if (!token) {
                    navigate('/login')
                    return
                }

                // O token JWT guarda o e-mail do usuário no campo sub
                const payload = JSON.parse(atob(token.split('.')[1]))
                const emailLogado = payload.sub

                // Busca os usuários cadastrados e encontra aquele que possui o e-mail do token
                const usuarios = await apiFetch('/usuarios')
                const usuarioLogado = usuarios.find((u: Usuario) => u.email === emailLogado)

                if (!usuarioLogado) {
                    setErro('Usuário não encontrado.')
                    return
                }

                setUsuario(usuarioLogado)
            } catch (error) {
                setErro('Erro ao carregar os dados do perfil.')
            }
        }

        carregarUsuario()
    }, [navigate])

    function sair() {
        // Remove o token JWT e encerra a sessão no frontend
        localStorage.removeItem('token')
        navigate('/')
    }

    if (erro) {
        return (
            <div className="perfil-page">
                <div className="perfil-message-card">
                    <h1>Não foi possível carregar o perfil</h1>
                    <p>{erro}</p>
                    <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
                </div>
            </div>
        )
    }

    if (!usuario) {
        return (
            <div className="perfil-page">
                <div className="perfil-message-card">
                    <p>Carregando perfil...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="perfil-page">
            <header className="perfil-header">
                <button className="perfil-voltar" onClick={() => navigate('/dashboard')}>
                    ← Voltar
                </button>

                <button className="perfil-sair" onClick={sair}>
                    Sair
                </button>
            </header>

            <main className="perfil-main">
                {/* Card principal com os dados reais do usuário logado */}
                <section className="perfil-card">
                    <div className="perfil-avatar">
                        <img
                            src={avatarDefault}
                            alt="Avatar padrão do SkillSwap"
                        />
                    </div>

                    <div className="perfil-info-principal">
                        <span className="perfil-tag">Meu perfil</span>
                        <h1>{usuario.nome}</h1>
                        <p>
                            {usuario.bio || 'Este usuário ainda não adicionou uma bio.'}
                        </p>
                    </div>
                </section>

                {/* Informações cadastradas no backend */}
                <section className="perfil-dados">
                    <h2>Informações do usuário</h2>

                    <div className="perfil-dados-grid">
                        <div className="perfil-dado">
                            <span>E-mail</span>
                            <strong>{usuario.email}</strong>
                        </div>

                        <div className="perfil-dado">
                            <span>Telefone</span>
                            <strong>{usuario.telefone || 'Não informado'}</strong>
                        </div>

                        <div className="perfil-dado">
                            <span>Cidade</span>
                            <strong>{usuario.cidade || 'Não informada'}</strong>
                        </div>

                        <div className="perfil-dado">
                            <span>Identificação</span>
                            <strong>Usuário #{usuario.id}</strong>
                        </div>
                    </div>
                </section>

                {/* Ações principais relacionadas ao perfil */}
                <section className="perfil-acoes">
                    <h2>Ações rápidas</h2>

                    <div className="perfil-acoes-grid">
                        <button onClick={() => navigate('/explorar')}>
                            Explorar habilidades
                        </button>

                        <button onClick={() => navigate('/dashboard')}>
                            Voltar ao Dashboard
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default PerfilPage