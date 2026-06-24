import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Snippet } from './types'

interface SnippetStore {
  snippets: Snippet[]
  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt'>) => void
  deleteSnippet: (id: string) => void
  toggleFavorite: (id: string) => void
}

export const useSnippetStore = create<SnippetStore>()(
  persist(
    (set) => ({
      snippets: [],

      addSnippet: (data) =>
        set((state) => ({
          snippets: [
            ...state.snippets,
            {
              ...data,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
          ],
        })),

      deleteSnippet: (id) =>
        set((state) => ({
          snippets: state.snippets.filter((s) => s.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          snippets: state.snippets.map((s) =>
            s.id === id ? { ...s, favorite: !s.favorite } : s
          ),
        })),
    }),
    { name: 'snippet-library' }
  )
)