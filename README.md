![PORTAL FILMES](./assets/banner.png)

**[Site](https://z4ffarani-portal-filmes.vercel.app)**

PORTAL FILMES é uma plataforma fictícia que permite aos usuários explorarem filmes internacionais ou séries de televisão populares, filtrarem gêneros de filmes e organizarem seus conteúdos "para ver depois". Ele utiliza a API (interface de programação de aplicações) do site The Movie Database (TMDb) para obter informações atualizadas sobre filmes e séries.

---

## Funcionalidades

- **Exibição de filmes e séries populares** | O programa faz requisições à API do TMDb para buscar listas de filmes e séries populares.
- **Pop-ups detalhados** | Ao clicar em um filme ou série na página `Home`, um pop-up aparece, exibindo detalhes, como trailer, elenco, avaliação e sinopse.
- **Busca avançada** | O usuário pode buscar por filmes e séries usando um campo de busca na página `Collection`.
- **Gêneros de filmes** | O programa permite que os usuários explorem filmes por gênero utilizando a navegação baseada em URL (localizador uniforme de recursos) com `useParams`.
- **Armazenamento local** | Os usuários podem adicionar filmes e séries às listas `conteudoParaVer` ou `conteudoAssistido`, utilizando o `localStorage` para persistência de dados.

---

## Como executar

### Pré-requisitos
- Node.js
- Uma chave da **[API do TMDb](https://www.themoviedb.org/settings/api)**, que deve substituir a chave presente no código

```bash
git clone https://github.com/Z4ffarani/PORTAL-FILMES.git
cd PORTAL-FILMES/portal-filmes
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## Observações

- O site é totalmente responsivo, adaptando-se a diversas telas de dispositivos.
- Não é possível realizar login ou cadastro pessoal na plataforma.
- O catálogo de filmes e séries tende a mudar, pois o banco de dados da TMDb se atualiza periodicamente.
- A seção de recomendados da página `Home`, válida somente para filmes, filtra-os pelo gênero mais predominante entre os marcados como assistidos pelo usuário na página `Collection`, sendo os resultados da seção estatisticamente favoráveis.
- O projeto utiliza `localStorage` para armazenar dados temporariamente. Isso significa que os dados são mantidos apenas enquanto o servidor local estiver funcionando, sendo perdidos ao encerrá-lo. Para um sistema mais robusto de login, recomenda-se o uso de um banco de dados e autenticação segura.

---

## Tecnologias

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

---

## Agradecimentos

- **[Caio Vinícius Gonçalves de Oliveira](https://github.com/caiooliveira-tech)**
- **[The Movie Database](https://www.themoviedb.org)**
