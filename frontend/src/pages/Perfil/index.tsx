import { useNavigate } from 'react-router-dom'
import './Perfil.css'

// Dados fictícios do perfil - depois virão do backend
const usuario = {
  nome: 'Ana Clara',
  verificado: true,
  localizacao: 'São Paulo, SP',
  nota: 4.6,
  totalAvaliacoes: 128,
  bio: 'Professora de Inglês apaixonada por viagens e culturas. Vamos aprender juntos!',
  skillsOferece: [
    { nome: 'Inglês',       nivel: 'Avançado'     },
    { nome: 'Conversação',  nivel: 'Avançado'     },
  ],
  skillsInteresse: [
    { nome: 'Edição de Vídeo', nivel: 'Intermediário' },
    { nome: 'Fotografia',      nivel: 'Avançado'      },
  ],
  avaliacoes: [
    { id: 1, nome: 'Gabriel M.', nota: 5.0, texto: 'Aulas incríveis!', emoji: '👨🏽' },
  ],
}

function PerfilPage() {
  const navigate = useNavigate()

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
          {usuario.verificado && <span className="perfil-verificado">✅</span>}
        </div>

        <p className="perfil-localizacao">📍 {usuario.localizacao}</p>

        <div className="perfil-nota">
          ⭐ {usuario.nota} ({usuario.totalAvaliacoes})
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
          {usuario.skillsOferece.map((skill) => (
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
          {usuario.skillsInteresse.map((skill) => (
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
        {usuario.avaliacoes.map((av) => (
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