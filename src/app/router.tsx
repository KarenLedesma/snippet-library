// Si alguien necesita agregar una ruta nueva, es en este archivo.
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SnippetsPage from '../features/snippets/components/SnippetsPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SnippetsPage />} />
      </Routes>
    </BrowserRouter>
  )
}