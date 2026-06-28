// Muestra todos los snippets guardados como tarjetas.
// Si no hay ninguno, muestra un mensaje vacío.
// Cada tarjeta tiene estrella para favoritos y papelera para borrar.

import { useSnippetStore } from '../store'
import { Trash2, Star } from 'lucide-react'

export default function SnippetList() {
  const snippets = useSnippetStore((state) => state.snippets)
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet)
  const toggleFavorite = useSnippetStore((state) => state.toggleFavorite)

  if (snippets.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No hay snippets todavía. ¡Agregá el primero!
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-gray-900 rounded-xl p-5 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{snippet.title}</h3>
              <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded-full">
                {snippet.language}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(snippet.id)}
                className={snippet.favorite ? 'text-yellow-400' : 'text-gray-600'}
              >
                <Star size={18} />
              </button>
              <button
                onClick={() => deleteSnippet(snippet.id)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {snippet.description && (
            <p className="text-gray-400 text-sm">{snippet.description}</p>
          )}

          <pre className="bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto font-mono text-green-300">
            {snippet.code}
          </pre>

          {snippet.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}