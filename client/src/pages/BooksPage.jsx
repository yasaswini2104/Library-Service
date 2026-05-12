import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { bookService } from '../services/bookService'
import BookTable from '../components/books/BookTable'
import { Alert, PageHeader } from '../components/ui'

const FILTERS = [
  { label: 'All Books', value: 'all' },
  { label: 'Available Only', value: 'available' },
]

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchType, setSearchType] = useState('title')
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)

  const fetchBooks = useCallback(async (f = filter) => {
    setLoading(true)
    setError('')
    try {
      const res = f === 'available'
        ? await bookService.getAvailableBooks()
        : await bookService.getAllBooks()
      setBooks(res.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    if (!searchQuery) fetchBooks()
  }, [filter, fetchBooks, searchQuery])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) { fetchBooks(); return }
    setSearching(true)
    setError('')
    try {
      const res = searchType === 'title'
        ? await bookService.searchByTitle(searchQuery.trim())
        : await bookService.searchByAuthor(searchQuery.trim())
      setBooks(res.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    fetchBooks()
  }

  return (
    <div className="page-enter">
      <PageHeader
        title="Books"
        subtitle="Manage your library collection"
        action={
          <Link to="/books/add" className="btn-primary">＋ Add Book</Link>
        }
      />

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="input-field w-36 shrink-0"
        >
          <option value="title">By Title</option>
          <option value="author">By Author</option>
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${searchType}…`}
            className="input-field pr-8"
          />
          {searchQuery && (
            <button type="button" onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 text-xs">✕</button>
          )}
        </div>
        <button type="submit" disabled={searching} className="btn-gold">
          {searching ? '…' : '⌕ Search'}
        </button>
      </form>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => { setFilter(f.value); setSearchQuery('') }}
            className={`px-4 py-1.5 text-xs font-body font-medium rounded-sm border transition-all duration-100
              ${filter === f.value
                ? 'bg-ink text-paper-50 border-ink'
                : 'text-ink/50 border-ink/15 hover:text-ink hover:border-ink/30'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <Alert type="error" message={error} onDismiss={() => setError('')} />}

      <div className="card mt-2">
        <BookTable books={books} loading={loading} />
      </div>
    </div>
  )
}
