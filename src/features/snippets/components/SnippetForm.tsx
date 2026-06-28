// Formulario para cargar un snippet nuevo.
// Título y código son obligatorios — si faltan, no deja guardar.
// Las etiquetas se ingresan separadas por coma y se convierten a array al guardar.

import { useState } from 'react'
import { useSnippetStore } from '../store'

export default function SnippetForm() {
  const addSnippet = useSnippetStore((state) => state.addSnippet)

  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('JavaScript')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [tags, setTags] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !code) return

    addSnippet({
      title,
      language,
      description,
      code,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      favorite: false,
    })

    setTitle('')
    setLanguage('JavaScript')
    setDescription('')
    setCode('')
    setTags('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Nuevo snippet</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white outline-none"
      >
        <option>JavaScript</option>
        <option>TypeScript</option>
        <option>React</option>
        <option>CSS</option>
        <option>HTML</option>
        <option>Python</option>
        <option>Otro</option>
      </select>

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <textarea
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={5}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none font-mono"
      />

      <input
        type="text"
        placeholder="Etiquetas (separadas por coma)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 rounded-lg p-3 font-semibold transition-colors"
      >
        Guardar snippet
      </button>
    </form>
  )
}