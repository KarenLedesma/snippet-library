import SnippetForm from './SnippetForm'
import SnippetList from './SnippetList'
import SearchBar from './SearchBar'

export default function SnippetsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        📚 Snippet Library
      </h1>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <SnippetForm />
        <SearchBar />
        <SnippetList />
      </div>
    </div>
  )
}