// La forma de un snippet. Si necesitan agregar un campo nuevo, es acá.

export interface Snippet {
  id: string
  title: string
  language: string
  code: string
  description: string
  tags: string[]
  favorite: boolean
  createdAt: number
}