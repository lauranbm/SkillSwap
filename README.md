# SkillSwap

## Sobre o projeto

O **SkillSwap** é uma plataforma desenvolvida para conectar pessoas interessadas em trocar conhecimentos e habilidades. A proposta é incentivar o aprendizado colaborativo, permitindo que usuários ofereçam aquilo que sabem fazer e encontrem outras pessoas dispostas a ensinar novas competências em troca.

O sistema possibilita o cadastro de usuários, gerenciamento de habilidades, exploração de oportunidades de troca e acompanhamento do ciclo completo das propostas realizadas entre os participantes.

---

## Funcionalidades

* Cadastro de usuários;
* Login com autenticação JWT;
* Visualização e edição do perfil do usuário;
* Cadastro de habilidades;
* Listagem das habilidades cadastradas pelo usuário;
* Exploração das habilidades disponíveis na plataforma;
* Busca e filtro por categorias;
* Proposição de trocas entre usuários;
* Visualização dos matches do usuário;
* Aceite ou recusa de propostas recebidas;
* Liberação dos dados de contato após o aceite;
* Conclusão das trocas realizadas;
* Dashboard com indicadores personalizados do usuário.

---

## Tecnologias utilizadas

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT (JSON Web Token)
* Spring Data JPA
* Maven

### Frontend

* React
* TypeScript
* Vite
* CSS

### Banco de dados

* MySQL
* Docker

---

## Como executar o projeto

### Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Execute a aplicação:

```bash
mvn spring-boot:run
```

O backend será iniciado na porta configurada no projeto.

---

### Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação:

```bash
npm run dev
```

O frontend ficará disponível no endereço informado pelo Vite.

---

## Fluxo principal do sistema

1. O usuário realiza seu cadastro na plataforma;
2. Efetua login utilizando autenticação JWT;
3. Cadastra suas habilidades;
4. Explora habilidades cadastradas por outros usuários;
5. Propõe uma troca de conhecimentos;
6. O destinatário pode aceitar ou recusar a proposta;
7. Após o aceite, os dados de contato dos participantes são liberados;
8. A troca pode ser marcada como concluída após sua realização.

---

## Estrutura do projeto

```text
SkillSwap/
├── backend/
├── frontend/
└── README.md
```

---

## Integrantes

* Laura Neves Bittencourt Moreira
* Aline Tiburcio

---

## Considerações finais

O SkillSwap foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento full stack, integrando frontend e backend por meio de APIs REST, autenticação com JWT, persistência de dados e regras de negócio relacionadas ao gerenciamento de trocas entre usuários.

Além dos aspectos técnicos, o projeto buscou oferecer uma experiência simples e intuitiva, simulando um ambiente real de compartilhamento de conhecimentos e conexões entre pessoas.
