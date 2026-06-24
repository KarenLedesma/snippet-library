# 📚 Snippet Library

Repositorio personal de fragmentos de código reutilizables, con búsqueda, etiquetas y copia rápida.

Proyecto integrador — Módulo de React | Junio 2026

---

## 👥 Integrantes

| Integrante | Desafío | Rama |
|---|---|---|
| Karen Ledesma | D1 — Base (scaffold, store, formulario, grilla) | `main` |
| (Integrante 2) | D2 — Filtros por lenguaje, etiqueta y favoritos | `feature/filtros` |
| (Integrante 3) | D3 — Copiar snippet al portapapeles | `feature/copiar` |
| (Integrante 4) | D4 — Búsqueda por palabra clave | `feature/buscador` |
| (Integrante 5) | D5 — Resaltado de sintaxis | `feature/resaltado` |

---

## 🛠️ Tecnologías

- React 19 + TypeScript + Vite
- Zustand v5 (estado global + persistencia en localStorage)
- React Router v7
- Tailwind CSS v4
- Lucide React (íconos)

---

## ✨ Funcionalidades

- Cargar snippets con título, lenguaje, descripción, código y etiquetas
- Marcar snippets como favoritos
- Eliminar snippets
- Persistencia automática en localStorage
- Filtros por lenguaje, etiqueta y favoritos *(D2)*
- Copiar código al portapapeles *(D3)*
- Búsqueda por palabra clave *(D4)*
- Resaltado de sintaxis *(D5)*

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
src/
app/
router.tsx          # Rutas de la aplicación
features/
snippets/
components/
SnippetsPage.tsx    # Página principal
SnippetForm.tsx     # Formulario para cargar snippets
SnippetList.tsx     # Grilla de snippets
store.ts            # Store de Zustand con persistencia
types.ts            # Modelo de datos (Snippet)
shared/
components/         # Componentes reutilizables
main.tsx
index.css

---

## 🌿 Flujo de trabajo Git

- `main` — base del proyecto (D1)
- `develop` — rama de integración
- `feature/filtros` — D2
- `feature/copiar` — D3
- `feature/buscador` — D4
- `feature/resaltado` — D5

Cada integrante crea su rama desde `develop` y hace PR a `develop` al terminar.

---

## 🔗 Links

- **Repositorio:** https://github.com/KarenLedesma/snippet-library
- **Deploy:** *(próximamente)*