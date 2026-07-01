// Muestra todos los snippets guardados como tarjetas.
// Si no hay ninguno, muestra un mensaje vacío.
// Cada tarjeta tiene estrella para favoritos y papelera para borrar.

import { useState } from 'react'
import { useSnippetStore } from '../store'
import { Trash2, Star } from 'lucide-react'

export default function SnippetList() {
  const snippets = useSnippetStore((state) => state.snippets)
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet)
  const toggleFavorite = useSnippetStore((state) => state.toggleFavorite)

// 1. NUESTRAS CAJITAS DE MEMORIA (Acá va a desaparecer el amarillo)
  const [filterLang, setFilterLang] = useState('')
  const [filterFav, setFilterFav] = useState(false)
  const [filterTag, setFilterTag] = useState('')

  // 2. EXTRAEMOS LOS LENGUAJES QUE EXISTEN (Para los botones)
  const uniqueLangs = Array.from(new Set(snippets.map((s) => s.language)))

  // 3. NUESTRO COLADOR LÓGICO
  const filteredSnippets = snippets.filter((snippet) => {
    const matchLang = filterLang ? snippet.language === filterLang : true
    const matchFav = filterFav ? snippet.favorite === true : true
    const matchTag = filterTag 
      ? snippet.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())) 
      : true

    return matchLang && matchFav && matchTag
  })

  if (snippets.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No hay snippets todavía. ¡Agregá el primero!
      </p>
    )
  }

 return (
    <div className="flex flex-col gap-6">
      
      {/* BOTONERA INTEGRADA */}
      <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex flex-wrap gap-4 items-center">
        <span className="font-semibold text-gray-400 text-sm">Filtrar:</span>

        {/* Botón Favoritos */}
        <button
          onClick={() => setFilterFav(!filterFav)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${
            filterFav 
              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
          }`}
        >
          {filterFav ? '★ Favoritos' : '☆ Todos'}
        </button>

        {/* Buscador de Tags */}
        <input
          type="text"
          placeholder="Buscar #etiqueta..."
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
        />

        {/* Desplegable de Lenguaje */}
        <select
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
        >
          <option value="">Todos los lenguajes</option>
          {uniqueLangs.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* LA LISTA FILTRADA */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSnippets.map((snippet) => (
          <div key={snippet.id} className="bg-gray-900 rounded-xl p-5 flex flex-col gap-3 border border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{snippet.title}</h3>
                <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded-full mt-1 inline-block">
                  {snippet.language}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(snippet.id)}
                  className={snippet.favorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}
                >
                  <Star size={18} fill={snippet.favorite ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => deleteSnippet(snippet.id)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {snippet.description && (
              <p className="text-gray-400 text-sm">{snippet.description}</p>
            )}

            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto font-mono text-green-300 border border-gray-800">
              {snippet.code}
            </pre>

            {snippet.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {snippet.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    )
    }