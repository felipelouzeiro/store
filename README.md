# Fake Store - Aplicação Front-end

Aplicação React desenvolvida para consumir a Fake Store API.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilização
- **React Router DOM** - Roteamento client-side

## 📋 Decisões Técnicas

### Por que Vite ao invés de Next.js?

Optei pelo **Vite** pelas seguintes razões:

1. **Simplicidade**: Para uma SPA simples que consome uma API externa, o Vite oferece uma configuração mais direta e menos overhead.
2. **Performance de desenvolvimento**: Hot Module Replacement extremamente rápido
3. **Bundle menor**: Gera bundles otimizados sem a necessidade de SSR
4. **Escopo do projeto**: Este é um projeto focado em consumo de API REST, onde SSR não traz benefícios significativos
5. **Build rápido**: Tempos de build menores que Next.js para projetos deste porte

**Trade-off**: Perdemos funcionalidades como SSR, ISR e otimizações de imagem automáticas do Next.js, mas para este caso de uso, essas funcionalidades não são necessárias.

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

```
src/
├── components/        # Componentes reutilizáveis de UI
│   ├── ui/           # Componentes base (Loading, Error, Empty)
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductFilters.tsx
├── pages/            # Páginas da aplicação
│   ├── ProductsPage.tsx
│   └── ProductDetailPage.tsx
├── hooks/            # Custom hooks
│   ├── useProducts.ts
│   └── useProduct.ts
├── services/         # Serviços de API
│   └── api.ts
├── types/            # Definições TypeScript
│   └── product.ts
├── App.tsx           # Configuração de rotas
└── main.tsx          # Ponto de entrada
```

### Separação de Responsabilidades

- **UI (components/)**: Componentes puros focados em apresentação
- **Lógica (hooks/)**: Custom hooks que encapsulam lógica de negócio e estado
- **Serviços (services/)**: Comunicação com APIs externas
- **Tipos (types/)**: Definições TypeScript para type safety

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## ✨ Funcionalidades Implementadas

### ✅ Obrigatórias

- ✅ Listagem de produtos com imagem, título, preço, categoria
- ✅ Filtro por categoria
- ✅ Ordenação por preço (asc/desc) e nome
- ✅ Tela de detalhes do produto
- ✅ Estados de loading, erro e empty state
- ✅ Layout responsivo

### 🎯 Diferenciais

- ✅ Arquitetura limpa e escalável
- ✅ TypeScript com tipagem completa
- ✅ Custom hooks para gerenciamento de estado
- ✅ Componentes reutilizáveis
- ✅ Código limpo sem comentários desnecessários
- ✅ Tratamento de erros consistente
- ✅ Performance otimizada (lazy loading de imagens)

## 🔄 Trade-offs

### Performance vs Complexidade

- **Decisão**: Custom hooks simples ao invés de bibliotecas de state management (Redux, Zustand)
- **Motivo**: Para este escopo, useState e useEffect são suficientes e reduzem complexidade
- **Trade-off**: Se a aplicação crescer significativamente, pode ser necessário migrar para uma solução mais robusta

### Estilização

- **Decisão**: Tailwind CSS utility-first
- **Motivo**: Desenvolvimento mais rápido, consistência visual e bundle otimizado
- **Trade-off**: Curva de aprendizado inicial e classes HTML mais verbosas

### Roteamento

- **Decisão**: React Router DOM (client-side routing)
- **Motivo**: Solução padrão da comunidade React para SPA
- **Trade-off**: Perdemos SEO comparado a Next.js, mas para este projeto não é crítico

## 📝 Pontos de Melhoria

### Curto Prazo

- [ ] Adicionar testes unitários (Jest + React Testing Library)
- [ ] Implementar cache de requisições (React Query ou SWR)
- [ ] Implementar skeleton loaders ao invés de spinner genérico
- [ ] Adicionar tratamento de erro mais granular (404, 500, network error)

### Médio Prazo

- [ ] Implementar design system mais completo
- [ ] Implementar internacionalização (i18n)
- [ ] Adicionar acessibilidade avançada (ARIA labels, navegação por teclado)

### Longo Prazo

- [ ] Migrar para React Query para melhor gerenciamento de cache
- [ ] Implementar infinite scroll ao invés de paginação

## 🎨 Design System

O projeto utiliza uma paleta de cores simples e consistente:

- **Primária**: Azul (`blue-600`, `blue-700`)
- **Neutros**: Cinzas (`gray-50` a `gray-900`)
- **Feedback**: 
  - Sucesso: Verde
  - Erro: Vermelho (`red-500`)
  - Aviso: Amarelo (`yellow-400`)

## 📦 Estrutura de Dados

A aplicação consome a [Fake Store API](https://fakestoreapi.com/docs) que retorna produtos com a seguinte estrutura:

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

## 📄 Licença

Este projeto foi desenvolvido como demonstração de habilidades técnicas.
