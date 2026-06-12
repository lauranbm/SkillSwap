import { useNavigate } from 'react-router-dom'
import './Home.css'

function HomePage() {
  // useNavigate permite trocar de página quando o usuário clicar nos botões
  const navigate = useNavigate()

  return (
    <div className="home-page">

      {/* Cabeçalho principal do site com logo, menu e botões de acesso */}
      <header className="home-header">
        <div className="home-logo">
          <span className="home-logo-icon">✦</span>
          <span>SkillSwap</span>
        </div>

        <nav className="home-menu">
          <a href="#inicio">Início</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#beneficios">Benefícios</a>
        </nav>

        <div className="home-actions">
          <button className="btn-link" onClick={() => navigate('/login')}>
            Entrar
          </button>

          <button className="btn-primary" onClick={() => navigate('/cadastro')}>
            Criar conta
          </button>
        </div>
      </header>

      {/* Primeira seção da página: apresenta a proposta principal do sistema */}
      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-text">
            <span className="hero-tag">Aprenda sem gastar dinheiro</span>

            <h1>
              Troque habilidades.
              <br />
              Aprenda com pessoas reais.
            </h1>

            <p>
              O SkillSwap conecta pessoas que querem ensinar e aprender através
              da troca de conhecimentos, serviços e experiências.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/cadastro')}>
                Começar agora
              </button>

              <button className="btn-secondary" onClick={() => navigate('/explorar')}>
                Explorar habilidades
              </button>
            </div>
          </div>

          {/* Ilustração reaproveitada do antigo onboarding */}
          <div className="hero-image-card">
            <img
              src="/src/assets/onboarding2.svg"
              alt="Pessoa aprendendo uma nova habilidade"
            />
          </div>
        </section>

        {/* Seção que reaproveita as três ideias principais do protótipo mobile */}
        <section className="how-section" id="como-funciona">
          <div className="section-title">
            <span>Como funciona</span>
            <h2>Uma plataforma simples para trocar conhecimento</h2>
            <p>
              A ideia do sistema é facilitar encontros entre pessoas que têm
              algo para ensinar e algo que desejam aprender.
            </p>
          </div>

          <div className="how-cards">
            <article className="how-card">
              <img src="/src/assets/onboarding1.svg" alt="Compartilhar habilidades" />
              <h3>Compartilhe o que você sabe</h3>
              <p>Cadastre habilidades que você domina e inspire outras pessoas.</p>
            </article>

            <article className="how-card">
              <img src="/src/assets/onboarding2.svg" alt="Aprender novas habilidades" />
              <h3>Aprenda gratuitamente</h3>
              <p>Troque conhecimento por conhecimento, sem envolver dinheiro.</p>
            </article>

            <article className="how-card">
              <img src="/src/assets/onboarding3.svg" alt="Conectar pessoas" />
              <h3>Conecte-se com pessoas reais</h3>
              <p>Encontre usuários com interesses compatíveis e combine uma troca.</p>
            </article>
          </div>
        </section>

        {/* Seção de benefícios do projeto */}
        <section className="benefits-section" id="beneficios">
          <div className="section-title">
            <span>Benefícios</span>
            <h2>Por que escolher o SkillSwap?</h2>
            <p>
              O SkillSwap foi criado para tornar o aprendizado mais acessível,
              incentivar a troca de conhecimentos e aproximar pessoas por meio da colaboração.
            </p>
          </div>

          <div className="benefits-cards">
            <article className="benefit-card">
              <h3>Troca de conhecimentos</h3>
              <p>
                A plataforma facilita o encontro entre pessoas que desejam ensinar
                o que sabem e aprender novas habilidades.
              </p>
            </article>

            <article className="benefit-card">
              <h3>Conexões humanas</h3>
              <p>
                O sistema incentiva relações baseadas em colaboração, confiança e
                interesses em comum.
              </p>
            </article>

            <article className="benefit-card">
              <h3>Aprenda sem gastar dinheiro</h3>
              <p>
                No SkillSwap, o conhecimento funciona como moeda de troca, permitindo
                aprender sem custos financeiros.
              </p>
            </article>
          </div>
        </section>

        {/* Seção final para incentivar o cadastro do usuário */}
        <section className="cta-section">
          <div>
            <h2>Pronto para fazer sua primeira troca?</h2>
            <p>
              Crie sua conta, cadastre suas habilidades e encontre pessoas com
              interesses parecidos com os seus.
            </p>
          </div>

          <button className="btn-white" onClick={() => navigate('/cadastro')}>
            Criar conta gratuita
          </button>
        </section>
      </main>
    </div>
  )
}

export default HomePage