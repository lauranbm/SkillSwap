import { useEffect, useState } from 'react'
import { apiFetch } from '../../services/api'
import './Perfil.css'
import { useNavigate } from 'react-router-dom'

// Dados fictícios do perfil - depois virão do backend
type Usuario = {
    id: number
    nome: string
    telefone: string | null
    email: string
    cidade: string
    bio: string
}
const skillsOferece = [
    { nome: 'Inglês', nivel: 'Avançado' },
    { nome: 'Conversação', nivel: 'Avançado' },
]

const skillsInteresse = [
    { nome: 'Edição de Vídeo', nivel: 'Intermediário' },
    { nome: 'Fotografia', nivel: 'Avançado' },
]

const avaliacoes = [
    { id: 1, nome: 'Gabriel M.', nota: 5.0, texto: 'Aulas incríveis!', emoji: '👨🏽' },
]

function PerfilPage() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    navigate('/login')
                    return
                }

                const payload = JSON.parse(atob(token.split('.')[1]))
                const emailLogado = payload.sub

                const usuarios = await apiFetch('/usuarios')
                const usuarioLogado = usuarios.find((u: Usuario) => u.email === emailLogado)

                setUsuario(usuarioLogado)
            } catch (error) {
                console.error('Erro ao carregar usuário:', error)
            }
        }

        carregarUsuario()
    }, [])

    if (!usuario) {
        return <p>Carregando perfil...</p>
    }

    return (
        <div className="perfil-container">

            {/* Botão voltar */}
            <button className="perfil-voltar" onClick={() => navigate(-1)}>
                ←
            </button>

            {/* Bloco do topo: foto, nome, localização, nota, bio */}
            <div className="perfil-topo">
                <div className="perfil-foto">👩🏻</div>

                <div className="perfil-nome">
                    {usuario.nome}
                    {/* Ícone de verificado só aparece se o usuário for verificado */}
                    <span className="perfil-verificado">✅</span>
                </div>

                <p className="perfil-localizacao">📍 {usuario.cidade}</p>

                <div className="perfil-nota">
                    <div className="perfil-nota">
                        ⭐ 4.8 (perfil ativo)
                    </div>
                </div>

                <p className="perfil-bio">{usuario.bio}</p>
            </div>

            {/* Skills que oferece */}
            <div className="perfil-secao">
                <div className="perfil-secao-header">
                    <h2>Skills que ofereço</h2>
                    <button>Ver todas</button>
                </div>
                <div className="skills-lista">
                    {skillsOferece.map((skill) => (
                        <div className="skill-tag" key={skill.nome}>
                            {skill.nome}
                            <span>{skill.nivel}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills de interesse */}
            <div className="perfil-secao" style={{ marginTop: '20px' }}>
                <div className="perfil-secao-header">
                    <h2>Skills que tenho interesse</h2>
                    <button>Ver todas</button>
                </div>
                <div className="skills-lista">
                    {skillsInteresse.map((skill) => (
                        <div className="skill-tag" key={skill.nome}>
                            {skill.nome}
                            <span>{skill.nivel}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Avaliações */}
            <div className="perfil-secao" style={{ marginTop: '20px' }}>
                <div className="perfil-secao-header">
                    <h2>Avaliações</h2>
                    <button>Ver todas</button>
                </div>
                {avaliacoes.map((av) => (

                    <div className="avaliacao-card" key={av.id}>
                        <div className="avaliacao-topo">
                            <div className="avaliacao-avatar">{av.emoji}</div>
                            <div>
                                <p className="avaliacao-nome">{av.nome}</p>
                                <p className="avaliacao-nota">⭐ {av.nota}</p>
                            </div>
                        </div>
                        <p className="avaliacao-texto">{av.texto}</p>
                    </div>

                ))}
            </div>

            {/* Botão fixo no rodapé */}
            <button
                className="perfil-botao-fixo"
                onClick={() => navigate('/match')} // futuramente abre modal de proposta
            >
                Propor troca
            </button>

        </div>
    )
}

export default PerfilPage