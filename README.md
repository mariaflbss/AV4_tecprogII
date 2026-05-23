#  AV4 Técnicas de Programação II - Atlantis — Sistema de Gestão para Hotéis, Pousadas e Resorts

> Interface web moderna para gerenciamento de hóspedes, acomodações, reservas e hospedagens do Sistema Atlantis, desenvolvida em React + TypeScript.

---

## Sobre o Projeto

O **Atlantis** é um sistema de gestão hoteleira que evoluiu de uma aplicação CLI em TypeScript para uma interface web completa. O front-end cobre todas as funcionalidades do MVP original — cadastro de titulares e dependentes, gerenciamento de acomodações pelos 6 tipos definidos pelo padrão Builder, registro de hospedagens e listagens completas — em uma experiência visual moderna e intuitiva.

---

##  Fluxo das Páginas

```
/login
  └── Autenticação do gestor
        └── /dashboard
              ├── /clientes
              │     ├── Listagem de titulares e dependentes
              │     ├── Cadastrar titular
              │     ├── Cadastrar dependente (vinculado a um titular)
              │     ├── Editar cliente (dados, endereço, telefones, documentos)
              │     └── Excluir cliente
              │
              ├── /acomodacoes
              │     ├── Listagem em cards com carrossel (4 por slide)
              │     ├── Filtro por disponibilidade
              │     ├── Visualizar detalhes da acomodação
              │     ├── Adicionar / Editar acomodação
              │     └── Excluir acomodação
              │
              ├── /reservas
              │     ├── Listagem de todas as hospedagens
              │     ├── Filtro por status e busca por hóspede / quarto
              │     ├── Registrar nova hospedagem
              │     │     ├── Selecionar titular
              │     │     ├── Selecionar dependentes (opcional)
              │     │     ├── Selecionar acomodação
              │     │     └── Informar datas de check-in e check-out
              │     └── Editar / Excluir hospedagem
              │
              └── Dashboard
                    ├── Cards de métricas (hóspedes, quartos, reservas, receita)
                    ├── Tabela de reservas recentes
                    ├── Ações rápidas
                    └── Gráfico de ocupação anual
```

---

##  Tipos de Acomodação

Seguindo o padrão **Builder** do sistema original, as acomodações são categorizadas em 6 tipos:

| Tipo              | Capacidade | Perfil                        |
|-------------------|------------|-------------------------------|
| Solteiro Simples  | 1 pessoa   | Cama de solteiro, básico      |
| Solteiro Mais     | 1 pessoa   | Cama de solteiro, climatizado |
| Casal Simples     | 2 pessoas  | Cama de casal                 |
| Família Simples   | 4 pessoas  | Cama casal + solteiro         |
| Família Mais      | 4 pessoas  | Suíte + garagem               |
| Família Super     | 6 pessoas  | Suítes múltiplas + garagem    |

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm ou yarn

### Passos

**1. Clone o repositório**
```bash
git clone https://github.com/mariaflbss/AV4_tecprogII
cd AV4-TP-atlantis
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**4. Acesse no navegador**
```
http://localhost:5173
```

### Credenciais de acesso (mock)

| Campo | Valor                  |
|-------|------------------------|
| E-mail | `gestor@atlantis.com` |
| Senha  | `senha123`            |

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev/) | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Vite](https://vitejs.dev/) | Bundler e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária |
| [React Router DOM](https://reactrouter.com/) | Navegação entre páginas |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones (Feather, Lucide, etc.) |
| [Recharts](https://recharts.org/) | Gráfico de ocupação anual |

---

##  Autora

**Maria Fernanda Laboissiere**  
  
