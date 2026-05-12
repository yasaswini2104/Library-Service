import { Badge, EmptyState, TableSkeleton } from '../ui'

export default function BookTable({ books, loading, emptyMessage = 'No books found' }) {
  if (loading) return <TableSkeleton rows={5} cols={4} />

  if (!books || books.length === 0) {
    return <EmptyState icon="📖" title={emptyMessage} subtitle="Try a different search or add a new book." />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body border-collapse">
        <thead>
          <tr className="border-b border-ink/12">
            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-ink/40 font-medium w-16">#</th>
            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-ink/40 font-medium">Title</th>
            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-ink/40 font-medium">Author</th>
            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-ink/40 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book.bookId} className="border-b border-ink/6 hover:bg-ink/3 transition-colors group">
              <td className="px-4 py-3 font-mono text-xs text-ink/30">{String(i + 1).padStart(2, '0')}</td>
              <td className="px-4 py-3 font-body font-medium text-ink">{book.title}</td>
              <td className="px-4 py-3 font-body text-ink/60 italic">{book.author}</td>
              <td className="px-4 py-3"><Badge available={book.availability} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 pt-3 pb-1 font-mono text-[10px] text-ink/30 uppercase tracking-widest">{books.length} record{books.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
