import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import './Login.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  const handleEntrar = async () => {

    if (!email || !senha) {
      setErro('Preencha o e-mail e a senha!')
      return
    }

    setCarregando(true)
    setErro('')

    try {
      const dados = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
      })

      localStorage.setItem('token', dados.token)

      navigate('/dashboard')

    } catch (error: any) {
      setErro(error.message || 'Erro ao fazer login. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login-page">

      {/* Área visual usada para deixar o login com aparência de página web */}
      <aside className="login-visual">
        {/* Área superior com botão voltar e logo do sistema */}
        <div className="login-visual-top">

          {/* Retorna para a página anterior */}
          <button
            className="login-visual-voltar"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div className="login-logo">
            SkillSwap
          </div>

        </div>

        <div className="login-visual-content">
          <h1>Continue sua jornada de aprendizado.</h1>
          <p>
            Acesse sua conta para cadastrar habilidades, encontrar pessoas e
            combinar novas trocas de conhecimento.
          </p>
        </div>

        <div className="login-visual-card">
          <strong>Troque conhecimento por conhecimento</strong>
          <p>Aprenda algo novo enquanto compartilha aquilo que você já sabe.</p>
        </div>
      </aside>

      {/* Área do formulário de login */}
      <main className="login-form-area">
        <div className="login-card">

          <h1 className="login-titulo">Bem-vindo de volta!</h1>
          <p className="login-subtitulo">
            Entre na sua conta para continuar usando o SkillSwap.
          </p>

          <label className="login-label">E-mail</label>
          <input
            className="login-input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Senha</label>
          <input
            className="login-input"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Exibe mensagem de erro quando o backend retorna falha ou os campos estão vazios */}
          {erro && <p className="login-erro">{erro}</p>}

          <button className="login-esqueceu">
            Esqueceu a senha?
          </button>

          {/* Botão principal: chama a função handleEntrar e envia os dados ao backend */}
          <button
            className="login-botao-principal"
            onClick={handleEntrar}
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-divisor">
            <hr /> <span>ou</span> <hr />
          </div>

          <button className="login-botao-google">
            <img
              src="https://www.google.com/favicon.ico"
              width={18}
              height={18}
              alt="Google"
            />
            Entrar com o Google
          </button>

          <p className="login-criar-conta">
            Ainda não tem conta?{' '}
            <button onClick={() => navigate('/cadastro')}>
              Criar conta
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage