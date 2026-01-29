# BuscaNomes - Descubra o Nome Perfeito

> Plataforma moderna e elegante para descoberta de nomes de bebês com significados detalhados, filtros avançados e design premium.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

---

## Funcionalidades

### Navegação e Descoberta
- **Busca Inteligente**: Pesquise por nome, significado ou origem
- **Filtros Avançados**: 
  - 30+ categorias temáticas (Mitologia, Celebridades, Bíblicos, etc.)
  - Filtro por gênero (Masculino, Feminino, Unissex)
  - Filtro alfabético (A-Z)
  - Carrossel horizontal com navegação suave

### Sistema de Favoritos
- Salve seus nomes preferidos
- Página dedicada com contador dinâmico
- Persistência local (LocalStorage)
- Estado vazio premium com call-to-action

### Gerador Aleatório
- Geração instantânea de nomes
- Filtro por gênero opcional
- Animações suaves e feedback visual

### Detalhes Completos
- Modal elegante com informações detalhadas
- Significado aprofundado
- Origem cultural e linguística
- Curiosidades e contexto histórico
- Botão de compartilhamento nativo

### Design Premium
- **Tema Escuro**: Degradês sofisticados (#0F2027 → #0a1612 → #000000)
- **Tema Claro**: Degradê laranja/dourado (#f7b733 → #fc4a1a)
- Cards com efeito de brilho (glowing effect)
- Animações fluidas e micro-interações
- Totalmente responsivo (Mobile-first)

### Paginação Inteligente
- 6 itens por página
- Navegação anterior/próxima
- Scroll automático para o topo
- Indicador visual de página atual

---

## Tecnologias

### Core
- **React 18.3** - Biblioteca UI
- **TypeScript 5.6** - Tipagem estática
- **Vite 6.0** - Build tool ultra-rápido

### Estilização
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e otimizados
- **Custom Gradients** - Sistema de cores profissional

### Utilitários
- **clsx** - Gerenciamento de classes CSS
- **tailwind-merge** - Merge inteligente de classes Tailwind

---

## Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/IsaqueCodeX/buscanomes.git

# Entre no diretório
cd buscanomes

# Instale as dependências
npm install

# Configure a API Gemini (opcional)
# Crie um arquivo .env.local na raiz do projeto
echo "VITE_GEMINI_API_KEY=sua_chave_aqui" > .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará rodando em `http://localhost:5173`

---

## Estrutura do Projeto

```
buscanomes/
├── components/           # Componentes React reutilizáveis
│   ├── AiWizard.tsx     # Assistente de IA (futuro)
│   ├── AnimatedBackground.tsx  # Fundo animado com gradiente
│   ├── MobileNavbar.tsx # Barra de navegação mobile
│   ├── NameCard.tsx     # Card individual de nome
│   ├── NameDetailsModal.tsx # Modal com detalhes completos
│   ├── SEOHead.tsx      # Meta tags dinâmicas
│   └── ui/
│       └── glowing-card.tsx # Card com efeito de brilho
├── services/            # Camada de serviços
│   ├── dataService.ts   # Carregamento de dados
│   └── geminiService.ts # Integração Google Gemini
├── lib/
│   └── utils.ts         # Funções utilitárias
├── public/
│   └── names.json       # Base de dados de nomes
├── App.tsx              # Componente principal
├── constants.tsx        # Constantes e categorias
├── types.ts             # Definições TypeScript
├── index.css            # Estilos globais e Tailwind
└── README.md            # Este arquivo
```

---

## Sistema de Cores

### Degradês Principais

**Dark Gradient** (Footer, Cards Selecionados, Favoritos)
```css
linear-gradient(to right, #0F2027, #0a1612, #000000)
```

**Brand Gradient** (Destaques, Hovers, CTAs)
```css
linear-gradient(to right, #f7b733, #fc4a1a)
```

### Paleta de Categorias
Cada categoria possui uma cor única representada por uma esfera colorida:
- **Latim**: #8B4513 (Marrom)
- **Hebraico**: #4169E1 (Azul Royal)
- **Grego**: #DAA520 (Dourado)
- **Brasileiro**: #FFD700 (Ouro)
- **Anime**: #FF6347 (Tomate)
- **Futebol**: #32CD32 (Verde Limão)
- *E mais 24 cores únicas...*

---

## Base de Dados

### Estrutura de um Nome

```typescript
interface BabyName {
  id: string;
  name: string;
  gender: 'M' | 'F' | 'U';
  origin: string;
  meaning: string;
  curiosity: string;
  category: string;
  popularity?: number;
  trend2025?: number;
}
```

### Categorias Disponíveis

**Origem Linguística** (12)
- Latim, Hebraico, Grego, Germânico, Celta, Brasileiro, Francês, Italiano, Inglês, Espanhol, Árabe, Japonês

**Cultura Pop** (7)
- Heróis & Vilões, Celebridades, Anos 2000, Séries e TV, Rock & Música, Anime, Disney

**Esportes** (3)
- Futebol, Basquete, Atletas Olímpicos

**História & Mitologia** (4)
- Mitologia, Vikings, Realeza, Figuras Históricas

**Estilo de Vida** (6)
- Bíblicos, Natureza, Curtos (Minimal), Vintage (Retrô), Internacionais, Astrologia

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build otimizado
npm run preview      # Visualiza build de produção

# Linting
npm run lint         # Verifica código com ESLint
```

---

## SEO e Performance

### Otimizações Implementadas

**Meta Tags Dinâmicas**
- Open Graph completo
- Twitter Cards
- Canonical URLs

**Performance**
- Lazy loading de componentes
- Code splitting automático com Vite
- Imagens otimizadas
- CSS minificado

**Acessibilidade**
- Navegação por teclado
- ARIA labels
- Contraste adequado (WCAG AA)
- Foco visível em todos os elementos interativos

---

## Roadmap

### v1.1 (Próxima Release)
- Integração completa com Google Gemini AI
- Sugestões personalizadas baseadas em preferências
- Sistema de quiz para descoberta de nomes
- Exportação de lista de favoritos (PDF/imagem)

### v1.2
- Modo escuro completo (tema switcher)
- Filtros combinados avançados
- Compartilhamento social otimizado
- PWA (Progressive Web App)

### v2.0
- Backend próprio (Node.js + MongoDB)
- Sistema de contas de usuário
- Comentários e avaliações de nomes
- API pública

---

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Desenvolvedor

**Isaque Santos Dev**

- Portfolio: [isaquesantosdev.com](https://isaquesantosdev.com)
- GitHub: [@IsaqueCodeX](https://github.com/IsaqueCodeX)
- LinkedIn: [Isaque Santos](https://www.linkedin.com/in/isaque-santos-720b8b15a)

---

## Agradecimentos

- Design inspirado em interfaces modernas de SaaS
- Ícones por [Lucide](https://lucide.dev)
- Fontes por [Google Fonts](https://fonts.google.com)
- Dados de nomes compilados de fontes públicas

---

<div align="center">

**[⬆ Voltar ao topo](#buscanomes---descubra-o-nome-perfeito)**

Desenvolvido por Isaque Santos Dev | © 2026 BuscaNomes v1.5

</div>
