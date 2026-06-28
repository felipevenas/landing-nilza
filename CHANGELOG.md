# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [0.1.3] - 28-06-2026

### Alterações

#### 🚀 Adicionado
- **Foto das Sócias**: Inclusão da imagem profissional das sócias Nilza Raul e Vera Neves (`socias.jpg`) na pasta de assets.

#### 🔧 Modificado
- **Quem Somos (`QuemSomos.jsx`)**: Substituído o card antigo de monograma pela foto das sócias com container animado em GSAP e adicionadas as informações oficiais de CRECI (Nilza: 20284, Vera: 24058) de forma elegante na coluna de texto.
- **Rodapé (`Footer.jsx`)**: Atualizados os números fictícios de CRECI-BA no rodapé para os CRECIs reais das corretoras.
- **Favicon**: Alterado o favicon do site para utilizar o logotipo estático de iniciais (`logo_nv_static_gold.svg`), e otimizado o `viewBox` para que fique quadrado (`0 -300 1200 1200`), evitando cortes e tornando o ícone maior e mais legível na aba do navegador.

## [0.1.2] - 18-06-2026

### Alterações

#### 🚀 Adicionado
- **Logotipos e Imagens Oficiais**: Adicionados novos logotipos e badges em formatos SVG e PNG à pasta `public/` para uso na identidade visual do site.

#### 🔧 Modificado
- **Favicon**: Atualizado o favicon do site para utilizar o novo logotipo dourado (`logo_nv_badge_gold.svg`), proporcionando uma identidade visual mais premium e elegante.

## [0.1.1] - 16-06-2026

### Alterações

#### 🔧 Modificado
- **Sobrenome de Vera**: Atualizado o nome da corretora para "Vera Neves" em todo o site (incluindo SEO, sobre nós, depoimentos, rodapé, contatos e README) para refletir o sobrenome oficial.
- **Link de Contato (WhatsApp)**: Atualizado o número de telefone de contato de `5571993805616` para `5571982613371` no [FloatingWhatsApp.jsx](file:///c:/Codes/landing-nilza-raul/src/components/FloatingWhatsApp.jsx) e [Contato.jsx](file:///c:/Codes/landing-nilza-raul/src/components/Contato.jsx).
- **Botão Flutuante do WhatsApp**: Refinada a animação de pulso e o efeito hover do botão flutuante.

## [0.1.0] - 15-06-2026

### Alterações

#### 🚀 Adicionado
- Criado o arquivo `CHANGELOG.md` para rastreamento de alterações.
- Criado o template de Pull Request em `.github/pull_request_template.md`.

#### 🔧 Modificado
- **Hero Headline ([Hero.jsx](file:///c:/Codes/landing-nilza-raul/src/components/Hero.jsx))**: Alterado o título principal para contemplar "investimento":
  - *Antes:* "Seu próximo lar começa com quem realmente entende o mercado."
  - *Depois:* "Seu próximo lar ou investimento começa com quem realmente entende o mercado."
- **Serviços Subtitle ([Servicos.jsx](file:///c:/Codes/landing-nilza-raul/src/components/Servicos.jsx))**: Substituído o termo comercial "chave na mão" para evitar conflitos de marca:
  - *Antes:* "Do primeiro contato à chave na mão."
  - *Depois:* "Do primeiro contato à entrega das chaves."
