import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function LoginPage() {
  // Guarda o que o usuário digita nos campos
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  function handleEntrar() {
    // Por enquanto só navega para home - depois conecta com o backend
    navigate('/home')
  }

  return (
    <div className="login-container">

      {/* Botão voltar */}
      <button className="login-voltar" onClick={() => navigate(-1)}>
        ←
      </button>

      {/* Título */}
      <h1 className="login-titulo">Bem-vindo de volta! 💜</h1>
      <p className="login-subtitulo">Entre na sua conta para continuar</p>

      {/* Campo e-mail */}
      <label className="login-label">E-mail</label>
      <input
        className="login-input"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Campo senha */}
      <label className="login-label">Senha</label>
      <input
        className="login-input"
        type="password"
        placeholder="••••••••"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {/* Esqueceu a senha */}
      <button className="login-esqueceu">Esqueceu a senha?</button>

      {/* Botão entrar */}
      <button className="login-botao-principal" onClick={handleEntrar}>
        Entrar
      </button>

      {/* Divisor */}
      <div className="login-divisor">
        <hr /> <span>ou</span> <hr />
      </div>

      {/* Botão Google */}
      <button className="login-botao-google">
        <img
          src="https://www.google.com/favicon.ico"
          width={18}
          height={18}
          alt="Google"
        />
        Entrar com o Google
      </button>

      {/* Link criar conta */}
      <p className="login-criar-conta">
        Ainda não tem conta?{' '}
        <button onClick={() => navigate('/cadastro')}>Criar conta</button>
      </p>

    </div>
  )
}

export default LoginPage