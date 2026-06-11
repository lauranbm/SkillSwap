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

  navigate('/home')

    } catch (error: any) {
    setErro(error.message || 'Erro ao fazer login. Tente novamente.')
    } finally {
    setCarregando(false)
    }
  }

  return (
    <div className="login-container">

      <button className="login-voltar" onClick={() => navigate(-1)}>←</button>

      <h1 className="login-titulo">Bem-vindo de volta! 💜</h1>
      <p className="login-subtitulo">Entre na sua conta para continuar</p>

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
        placeholder="••••••••"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {/* Erro só aparece se houver mensagem */}
      {erro && (
        <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px' }}>
          {erro}
        </p>
      )}

      <button className="login-esqueceu">Esqueceu a senha?</button>

      {/* Desabilitado enquanto aguarda o backend */}
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
        <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="Google" />
        Entrar com o Google
      </button>

      <p className="login-criar-conta">
        Ainda não tem conta?{' '}
        <button onClick={() => navigate('/cadastro')}>Criar conta</button>
      </p>

    </div>
  )
}

export default LoginPage