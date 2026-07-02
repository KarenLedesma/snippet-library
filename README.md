# 📚 Snippet Library

Repositorio personal de fragmentos de código reutilizables, con búsqueda, etiquetas y copia rápida.

Proyecto integrador — Módulo de React | Junio 2026  
**Idea elegida:** Idea 16 — Biblioteca de Snippets de Código

---

## 👥 Integrantes

| Integrante        | Desafío                                         | Rama                          |
|---|---|---|
| Karen Ledesma     | D1 — Base (scaffold, store, formulario, grilla) | `main`                        |
| Ailin Garay       | D2 — Filtros por lenguaje, etiqueta y favoritos | `feature/D2-filtros`          |
| Nicole Rodriguez  | D3 — Copiar snippet al portapapeles             | `feature/copiar`              |
| Karen Ledesma     | D4 — Búsqueda por palabra clave                 | `feature/buscador`            |
| Fiorella Valdivia | D5 — Resaltado de sintaxis                      | `feature/d5-design-highlight` |

---

## 🛠️ Tecnologías

- React 19 + TypeScript + Vite
- Zustand v5 (estado global + persistencia en localStorage)
- React Router v7
- Tailwind CSS v4
- Lucide React (íconos)
- highlight.js (resaltado de sintaxis)

---

## ✨ Funcionalidades

- Cargar snippets con título, lenguaje, descripción, código y etiquetas
- Marcar snippets como favoritos
- Eliminar snippets
- Persistencia automática en localStorage
- Filtros por lenguaje, etiqueta y favoritos *(D2)*
- Copiar código al portapapeles *(D3)*
- Búsqueda por palabra clave en título, descripción y código *(D4)*
- Resaltado de sintaxis según lenguaje *(D5)*

---

## 🚀 Cómo correr el proyecto

```bash
git clone https://github.com/KarenLedesma/snippet-library.git
cd snippet-library
npm install
npm run dev
```

Abrí http://localhost:5173 en el navegador.

---

## 📁 Estructura del proyecto

```bash
src/
  app/
    router.tsx                # Rutas de la aplicación
  features/
    snippets/
      components/
        SnippetsPage.tsx      # Página principal
        SnippetForm.tsx       # Formulario para cargar snippets
        SnippetList.tsx       # Grilla de snippets
        SearchBar.tsx         # Buscador por palabra clave
        CodeHighlight.tsx     # Resaltado de sintaxis con highlight.js
      store.ts                # Store de Zustand con persistencia
      types.ts                # Modelo de datos (Snippet)
  shared/
    components/               # Componentes reutilizables
  main.tsx
  index.css
.github/
  workflows/
    react-doctor.yml          # Análisis automático de código en cada PR
```

---

## 🌿 Flujo de trabajo Git

- `main` — base del proyecto (D1)
- `develop` — rama de integración
- `feature/D2-filtros` — D2
- `feature/copiar` — D3
- `feature/buscador` — D4
- `feature/d5-design-highlight` — D5

Cada integrante crea su rama desde `develop` y hace PR a `develop` al terminar.

---

## 🔗 Links

- **Repositorio:** https://github.com/KarenLedesma/snippet-library
- **Deploy:** https://snippet-library-drab.vercel.app