import { useSnippetStore } from '../store'

export default function SearchBar() {
  const searchQuery = useSnippetStore((state) => state.searchQuery)
  const setSearchQuery = useSnippetStore((state) => state.setSearchQuery)

  return (
    <input
      type="text"
      placeholder="Buscar por título, descripción o código..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
    />
  )
}