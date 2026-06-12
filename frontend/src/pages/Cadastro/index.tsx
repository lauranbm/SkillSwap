import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './Cadastro.css'

function CadastroPage() {
  const navigate = useNavigate()

  // Estados que guardam os dados digitados no formulário
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cidade, setCidade] = useState('')
  const [bio, setBio] = useState('')

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleCadastrar() {
    if (!nome || !telefone || !email || !senha || !cidade) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    setCarregando(true)
    setErro('')
    setSucesso('')

    try {
      // Envia os dados para o endpoint POST /usuarios do backend
      await apiFetch('/usuarios', {
        method: 'POST',
        body: JSON.stringify({
          nome,
          telefone,
          email,
          senha,
          cidade,
          bio,
        }),
      })

      setSucesso('Conta criada com sucesso! Redirecionando para o login...')

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error: any) {
      setErro(error.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="cadastro-page">
      <aside className="cadastro-visual">
        {/* Botão para retornar à página anterior */}
        <button className="cadastro-voltar" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="cadastro-logo">SkillSwap</div>

        <div className="cadastro-visual-content">
          <h1>Comece a trocar habilidades hoje.</h1>
          <p>
            Crie sua conta para compartilhar o que você sabe, encontrar novas
            pessoas e aprender de forma colaborativa.
          </p>
        </div>

        <div className="cadastro-visual-card">
          <strong>Aprenda sem usar dinheiro</strong>
          <p>O SkillSwap conecta pessoas por meio da troca de conhecimentos.</p>
        </div>
      </aside>

      <main className="cadastro-form-area">
        <div className="cadastro-card">
          <h1 className="cadastro-titulo">Criar conta</h1>
          <p className="cadastro-subtitulo">
            Preencha seus dados para começar a usar a plataforma.
          </p>

          <div className="cadastro-grid">
            <div>
              <label className="cadastro-label">Nome completo *</label>
              <input
                className="cadastro-input"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label className="cadastro-label">Telefone *</label>
              <input
                className="cadastro-input"
                type="text"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div>
              <label className="cadastro-label">E-mail *</label>
              <input
                className="cadastro-input"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="cadastro-label">Senha *</label>
              <input
                className="cadastro-input"
                type="password"
                placeholder="Digite uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div>
              <label className="cadastro-label">Cidade *</label>
              <input
                className="cadastro-input"
                type="text"
                placeholder="Ex: Goiânia"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div>
              <label className="cadastro-label">Bio</label>
              <input
                className="cadastro-input"
                type="text"
                placeholder="Conte um pouco sobre você"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {erro && <p className="cadastro-erro">{erro}</p>}
          {sucesso && <p className="cadastro-sucesso">{sucesso}</p>}

          <button
            className="cadastro-botao"
            onClick={handleCadastrar}
            disabled={carregando}
          >
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>

          <p className="cadastro-login">
            Já tem conta?{' '}
            <button onClick={() => navigate('/login')}>
              Entrar
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default CadastroPage