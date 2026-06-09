import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

// Dados de cada slide 
const slides = [
  {
    imagem: '/src/assets/onboarding1.svg',
    titulo: 'Compartilhe o que você sabe.',
    descricao: 'Ensine suas habilidades e inspire outras pessoas.',
  },
  {
    imagem: '/src/assets/onboarding2.svg',
    titulo: 'Aprenda novas habilidades gratuitamente',
    descricao: 'Troque conhecimento por conhecimento.',
  },
  {
    imagem: '/src/assets/onboarding3.svg',
    titulo: 'Conecte-se com pessoas reais.',
    descricao: 'Construa conexões verdadeiras através da troca.',
  },
]

function OnboardingPage() {
  // Guarda qual slide está sendo exibido (começa no 0)
  const [slideAtual, setSlideAtual] = useState(0)

  // useNavigate permite trocar de página via código
  const navigate = useNavigate()

  function avancar() {
    if (slideAtual < slides.length - 1) {
      // Ainda tem próximo slide - avança
      setSlideAtual(slideAtual + 1)
    } else {
      // Era o último slide - vai para o login
      navigate('/login')
    }
  }

  function pular() {
    navigate('/login')
  }

  const slide = slides[slideAtual]

  return (
    <div className="onboarding-container">

      {/* Botão pular - só aparece antes do último slide */}
      {slideAtual < slides.length - 1 && (
        <button className="onboarding-pular" onClick={pular}>
          Pular
        </button>
      )}

      {/* Ilustração */}
      <div className="onboarding-imagem">
        <img src={slide.imagem} alt={slide.titulo} />
      </div>

      {/* Texto */}
      <div className="onboarding-texto">
        <h1>{slide.titulo}</h1>
        <p>{slide.descricao}</p>
      </div>

      {/* Rodapé: bolinhas + botão */}
      <div className="onboarding-rodape">

        {/* Bolinhas indicadoras */}
        <div className="onboarding-bolinhas">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`bolinha ${index === slideAtual ? 'ativa' : ''}`}
            />
          ))}
        </div>

        {/* Botão avançar */}
        <button className="onboarding-botao" onClick={avancar}>
          →
        </button>

      </div>
    </div>
  )
}

export default OnboardingPage