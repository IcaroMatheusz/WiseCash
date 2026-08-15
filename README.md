# WiseCash

> Um sistema web para gerenciamento financeiro pessoal.

**WiseCash** é uma aplicação web desenvolvida para ajudar no controle das finanças pessoais, permitindo registrar receitas e despesas, organizar transações por categorias e acompanhar a situação financeira através de um dashboard.

O projeto foi desenvolvido com **React**, **Tailwind CSS** e **Supabase**, com foco em praticar conceitos de desenvolvimento frontend, autenticação, persistência de dados e integração com serviços backend.

🔗 **[Acessar o WiseCash](https://wise-cash-pi.vercel.app/)**

🔗 **[Repositório](https://github.com/IcaroMatheusz/WiseCash)**

---

## ✨ Funcionalidades

* 🔐 Cadastro e autenticação de usuários
* 💰 Cadastro de receitas e despesas
* 📊 Dashboard para acompanhamento financeiro
* 🗂️ Criação e gerenciamento de categorias
* 📋 Visualização das transações
* ✏️ Edição de informações do usuário
* 🖼️ Gerenciamento de foto de perfil
* 📱 Interface responsiva
* 🔒 Dados associados individualmente a cada usuário
* ☁️ Persistência dos dados através do Supabase

---

## 🛠️ Tecnologias utilizadas

### Frontend

* [React](https://react.dev/)
* [Vite](https://vite.dev/)
* [React Router](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide React](https://lucide.dev/)

### Backend / BaaS

* [Supabase](https://supabase.com/)

  * Authentication
  * PostgreSQL
  * Storage

### Ferramentas

* Git
* GitHub
* ESLint
* Vercel

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada em componentes e páginas do React, com o Supabase responsável pela autenticação, banco de dados e armazenamento de arquivos.

```text
WiseCash
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── HeaderBar
│   │   ├── SideBar
│   │   └── ...
│   │
│   ├── context/
│   │   └── AuthContext
│   │
│   ├── pages/
│   │   ├── Dashboard
│   │   ├── Extrato
│   │   ├── Categorias
│   │   └── ...
│   │
│   ├── services/
│   │   └── ...
│   │
│   └── ...
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔐 Autenticação

A autenticação dos usuários é realizada através do **Supabase Auth**.

Cada usuário possui seus próprios dados financeiros, evitando que informações de diferentes contas sejam misturadas.

As credenciais utilizadas pelo Supabase são configuradas através de variáveis de ambiente.

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/IcaroMatheusz/WiseCash.git
```

Entre na pasta:

```bash
cd WiseCash
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

Você pode utilizar o arquivo `.env.example` presente no projeto como referência.

### 4. Execute em modo de desenvolvimento

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento local.

### 5. Build para produção

```bash
npm run build
```

---

## 📸 Screenshots

<img width="1916" height="612" alt="image" src="https://github.com/user-attachments/assets/8a0f350d-f007-4b00-93a7-7943021bab04" />

---

## 🎯 Objetivos do projeto

O WiseCash foi desenvolvido principalmente como um projeto de aprendizado.

Durante o desenvolvimento, os principais objetivos foram:

* Praticar React em uma aplicação mais próxima de um projeto real;
* Trabalhar com componentes reutilizáveis;
* Utilizar Context API para gerenciamento de autenticação;
* Trabalhar com rotas protegidas;
* Integrar uma aplicação React com um backend através do Supabase;
* Utilizar PostgreSQL para persistência de dados;
* Trabalhar com autenticação de usuários;
* Trabalhar com upload e armazenamento de arquivos;
* Aprender sobre Row Level Security (RLS);
* Praticar organização de projetos React;
* Aprender conceitos de deploy e variáveis de ambiente.

---

## 📚 Aprendizados

O desenvolvimento do WiseCash foi uma oportunidade para colocar em prática conhecimentos de **React, JavaScript, SQL, autenticação, banco de dados, gerenciamento de estado, integração com APIs e deploy**.

Mais do que simplesmente criar uma interface, o projeto serviu para entender melhor como diferentes partes de uma aplicação web se comunicam e como estruturar uma aplicação frontend conectada a um serviço backend.

---

## 👨‍💻 Autor

Desenvolvido por **Ícaro Matheus** e **Alexandre Fontele**.

* GitHub: [@IcaroMatheusz](https://github.com/IcaroMatheusz)

* GitHub: [@Kazeyhaya](https://github.com/Kazeyhaya)

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo.
