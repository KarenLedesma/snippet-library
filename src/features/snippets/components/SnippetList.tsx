import { useState } from 'react'
import { useSnippetStore } from '../store'
import { Trash2, Star, Copy, Check } from 'lucide-react'
import { CodeHighlight } from './CodeHighlight'

export default function SnippetList() {
  const snippets = useSnippetStore((state) => state.snippets)
  const searchQuery = useSnippetStore((state) => state.searchQuery)
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet)
  const toggleFavorite = useSnippetStore((state) => state.toggleFavorite)

  const [filterLang, setFilterLang] = useState('')
  const [filterFav, setFilterFav] = useState(false)
  const [filterTag, setFilterTag] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const uniqueLangs = Array.from(new Set(snippets.map((s) => s.language)))

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Error al copiar:', error)
    }
  }

  const filteredSnippets = snippets.filter((snippet) => {
    const matchLang = filterLang ? snippet.language === filterLang : true
    const matchFav = filterFav ? snippet.favorite === true : true
    const matchTag = filterTag
      ? snippet.tags.some((tag) => tag.toLowerCase().includes(filterTag.toLowerCase()))
      : true
    const q = searchQuery.toLowerCase()
    const matchSearch =
      snippet.title.toLowerCase().includes(q) ||
      snippet.description.toLowerCase().includes(q) ||
      snippet.code.toLowerCase().includes(q)
    return matchLang && matchFav && matchTag && matchSearch
  })

  if (filteredSnippets.length === 0) {
    return (
      <>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-gray-400 text-sm">Filtrar:</span>
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
          <input
            type="text"
            placeholder="Buscar #etiqueta..."
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
          />
          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
          >
            <option value="">Todos los lenguajes</option>
            {uniqueLangs.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <p className="text-center text-gray-500">
          {searchQuery ? 'No se encontraron resultados.' : 'No hay snippets todavía. ¡Agregá el primero!'}
        </p>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex flex-wrap gap-4 items-center">
        <span className="font-semibold text-gray-400 text-sm">Filtrar:</span>
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
        <input
          type="text"
          placeholder="Buscar #etiqueta..."
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
        />
        <select
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
        >
          <option value="">Todos los lenguajes</option>
          {uniqueLangs.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-neutral-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">{snippet.title}</h3>
                <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded-full mt-1 inline-block">
                  {snippet.language}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(snippet.id)}
                  className={snippet.favorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}
                >
                  <Star size={18} fill={snippet.favorite ? 'currentColor' : 'none'} />
                </button>
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
                    <><Check size={16} /><span>¡Copiado!</span></>
                  ) : (
                    <Copy size={16} />
                  )}
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

            <CodeHighlight code={snippet.code} language={snippet.language} />

            {snippet.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700"
                  >
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