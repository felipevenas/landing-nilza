# 🏡 N&V Imóveis | Landing Page Premium

> Landing page institucional premium, sofisticada e responsiva para as corretoras de imóveis Nilza e Vera (N&V Imóveis) em Salvador/BA.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)
![Workflow](https://img.shields.io/badge/Workflow-Trunk--Based-2ea44f)
![License](https://img.shields.io/badge/license-Propriet%C3%A1ria-red)

---

## 📖 Propósito

Apresentar o trabalho de excelência das corretoras Nilza e Vera com foco no mercado imobiliário de Salvador, BA. O projeto utiliza design minimalista de alto impacto visual (dark mode, detalhes em dourado e tipografia elegante) com animações dinâmicas e fluidas para oferecer uma experiência de usuário excepcional e conversões otimizadas.

## 🌟 Funcionalidades

- **Experiência Visual Premium**: Rolagem suave com `Lenis Scroll` integrada a animações GSAP de entrada.
- **Texto Revelado Dinamicamente**: Uso de `SplitType` no Hero para criar um efeito de escrita sutil sincronizado com o carregamento das Google Fonts.
- **Fundo Atmosférico**: Partículas douradas interativas suspensas baseadas em `@tsparticles/react`.
- **Navegação Inteligente**: Navbar adaptativa com menu hambúrguer customizado e animação em "X" para dispositivos móveis.
- **Seção de Serviços Minimalista**: Cards limpos com hover sutil que valorizam as soluções e serviços prestados.
- **Carrossel de Depoimentos**: Slider de feedback de clientes de alta performance.
- **Formulário de Contato Otimizado**: Layout moderno integrado com validação de campos.
- **Canal de Atendimento Rápido**: WhatsApp flutuante pulsante posicionado no canto inferior.

---

## 📁 Estrutura do Projeto

```
landing-nilza-raul/
├── public/                       # Assets estáticos públicos (logos, etc.)
├── src/
│   ├── components/               # Componentes modulares reutilizáveis
│   │   ├── Contato.jsx           # Seção e formulário de contato
│   │   ├── CustomCursor.jsx      # Cursor dinâmico customizado para desktop
│   │   ├── Depoimentos.jsx       # Carrossel de avaliações dos clientes
│   │   ├── FloatingWhatsApp.jsx  # Botão flutuante de atendimento rápido
│   │   ├── Footer.jsx            # Rodapé com informações da marca
│   │   ├── Hero.jsx              # Seção inicial de impacto com partículas e split text
│   │   ├── Navbar.jsx            # Menu superior com hambúrguer animado
│   │   ├── PorQueEscolher.jsx    # Diferenciais da marca N&V
│   │   ├── QuemSomos.jsx         # História das corretoras Nilza e Vera
│   │   └── Servicos.jsx          # Grid de serviços prestados
│   ├── App.jsx                   # Componente base que gerencia o Lenis Scroll global
│   ├── index.css                 # Design System (tokens, variáveis, botões e reset)
│   └── main.jsx                  # Ponto de entrada do app com ParticlesProvider
├── package.json                  # Dependências e scripts do projeto
├── vite.config.js                # Configurações do Vite
└── README.md                     # Esta documentação oficial
```

---

## 🏷️ Stack Tecnológica

### Core & Framework
| Tecnologia | Versão | Propósito |
|---|---|---|
| React | 18.3.x | Biblioteca principal de interfaces reativas |
| Vite | 6.0.x | Tooling rápido de build e desenvolvimento local |
| GSAP | 3.12.x | Criação de animações e timelines robustas |
| `@studio-freight/lenis` | latest | Efeito de scroll suave premium nos navegadores |
| `split-type` | latest | Divisão de caracteres e palavras para animação tipográfica |
| `@tsparticles/react` | latest | Renderização eficiente de partículas no background |
| `lucide-react` | latest | Conjunto de ícones vetoriais modernos |

### Estilização & Design
| Componente | Descrição |
|---|---|
| Vanilla CSS | Estilização pura para controle absoluto e transições refinadas em `src/index.css` |
| Cores | Paleta sofisticada baseada em Dourado (`#C9A84C`) e variações de Azul Escuro/Night |
| Tipografia | Google Fonts: 'Playfair Display' para títulos elegantes e 'Inter' para o corpo de texto |

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js **18.x** ou superior
- Gerenciador de pacotes `npm` ou `yarn`
- Git instalado

### Setup Local

```bash
# 1. Clonar o repositório
git clone https://github.com/felipevenas/landing-nilza.git
cd landing-nilza

# 2. Instalar as dependências do projeto
npm install

# 3. Rodar o servidor de desenvolvimento local
npm run dev
```
O servidor será aberto em `http://localhost:5173`.

---

## 🤝 Contribuição — fluxo Trunk-Based

Este projeto adota o modelo de **Trunk-Based Development**. A branch principal estável é a `main`. Feature branches devem ser curtas e efêmeras.

### Convenções de Commit
| Prefixo | Uso | SemVer |
|---|---|---|
| `feat:` | Nova funcionalidade | MINOR |
| `fix:` | Correção de bug | PATCH |
| `chore:` | Ajuste de build, dependências ou configurações | - |
| `docs:` | Atualizações na documentação | - |
| `style:` | Ajustes visuais estritos de CSS ou formatação | - |
| `refactor:` | Refatoração interna de código | - |

---

## 📄 Licença

Software proprietário — todos os direitos reservados.
**&copy; 2026 N&V Imóveis**
