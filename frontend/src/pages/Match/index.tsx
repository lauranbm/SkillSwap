import { useEffect, useState } from 'react'
import { apiFetch } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './Match.css'


type Habilidade = {
    id: number
    titulo: string
    descricao: string
    categoria: string
    trocaDesejada: string
    usuarioId: number
    usuarioNome: string
}

function MatchPage() {
    const navigate = useNavigate()
    const [habilidades, setHabilidades] = useState<Habilidade[]>([])

    useEffect(() => {
        async function carregarHabilidades() {
            try {
                const dados = await apiFetch('/habilidades')
                setHabilidades(dados)
            } catch (error) {
                console.error('Erro ao carregar habilidades:', error)
            }
        }

        carregarHabilidades()
    }, [])

    if (habilidades.length < 2) {
        return <p>Carregando match...</p>
    }

    const pessoa1 = habilidades[0]
    const pessoa2 = habilidades[1]

    return (
        <div className="match-container">

            {/* Título */}
            <h1 className="match-titulo">É um match! 🎉</h1>
            <p className="match-subtitulo">Vocês têm interesses compatíveis!</p>

            {/* Dois avatares lado a lado com ícone de estrela no meio */}
            <div className="match-avatares">

                {/* Pessoa 1 */}
                <div className="match-pessoa">
                    <div className="match-foto">{"👩🏻"}</div>
                    <p className="match-pessoa-nome">{pessoa1.usuarioNome}</p>
                    <p className="match-pessoa-label">Ensino</p>
                    <p className="match-pessoa-skill">{pessoa1.titulo}</p>
                </div>

                {/* Ícone central de match */}
                <span className="match-icone">✨</span>

                {/* Pessoa 2 */}
                <div className="match-pessoa">
                    <div className="match-foto">{"👩🏽"}</div>
                    <p className="match-pessoa-nome">{pessoa2.usuarioNome}</p>
                    <p className="match-pessoa-label">Ensino</p>
                    <p className="match-pessoa-skill">{pessoa2.titulo}</p>
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