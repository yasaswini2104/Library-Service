import apiClient from '../api/apiClient'

export const bookService = {
  addBook: async (data) => {
    const res = await apiClient.post('/books', data)
    return res.data
  },

  getAllBooks: async () => {
    const res = await apiClient.get('/books')
    return res.data
  },

  getAvailableBooks: async () => {
    const res = await apiClient.get('/books/available')
    return res.data
  },

  searchByTitle: async (title) => {
    const res = await apiClient.get('/books/search/title', { params: { title } })
    return res.data
  },

  searchByAuthor: async (author) => {
    const res = await apiClient.get('/books/search/author', { params: { author } })
    return res.data
  },
}
