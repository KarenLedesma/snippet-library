import { userState } from 'react' 
import { useSnippetStore } from '../store'
import { Trash2, Star, Copy, Check} from 'lucide-react'

export default function SnippetList() {
  const snippets = useSnippetStore((state) => state.snippets)
  const searchQuery = useSnippetStore((state) => state.searchQuery)
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet)
  const toggleFavorite = useSnippetStore((state) => state.toggleFavorite)

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Error al copiar:', error)
    }
  }

  if (snippets.length === 0) {
  const filtered = snippets.filter((s) => {
    const q = searchQuery.toLowerCase()
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q)
    )
  })

  if (filtered.length === 0) {
    return (
      <p className="text-center text-gray-500">
        {searchQuery ? 'No se encontraron resultados.' : 'No hay snippets todavía. ¡Agregá el primero!'}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filtered.map((snippet) => (
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

              {/* Botón para copiar el código al portapapeles */}
              <button
                onClick={() => handleCopy(snippet.id, snippet.code)}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  copiedId === snippet.id
                    ? 'text-green-400'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Copiar código"
              >
                {copiedId === snippet.id ? (
                  <>
                    <Check size={16} />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <Copy size={16} />
                )}
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