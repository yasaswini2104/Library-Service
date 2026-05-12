import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookService } from '../services/bookService'
import { Spinner } from '../components/ui'

function StatCard({ label, value, icon, to, accent }) {
  const accents = {
    gold: 'border-l-gold',
    sage: 'border-l-sage',
    crimson: 'border-l-crimson',
    ink: 'border-l-ink/30',
  }
  return (
    <Link to={to} className={`card border-l-4 ${accents[accent] || accents.ink} hover:shadow-book-hover transition-shadow block`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-1">{label}</p>
          <p className="font-display text-3xl font-bold text-ink">{value ?? '—'}</p>
        </div>
        <span className="text-2xl opacity-30">{icon}</span>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: null, available: null, issued: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [all, avail] = await Promise.all([
          bookService.getAllBooks(),
          bookService.getAvailableBooks(),
        ])
        const total = all.data?.length ?? 0
        const available = avail.data?.length ?? 0
        setStats({ total, available, issued: total - available })
      } catch {
        // silently fail on dashboard
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page-enter">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold italic text-ink">
          Good morning, <span className="text-gradient-gold">Librarian.</span>
        </h1>
        <p className="font-body text-sm text-ink/45 mt-1.5">Here's what's happening in your library today.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="Total Books" value={stats.total} icon="📚" to="/books" accent="ink" />
          <StatCard label="Available" value={stats.available} icon="✅" to="/books" accent="sage" />
          <StatCard label="Currently Issued" value={stats.issued} icon="📤" to="/issues" accent="gold" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickCard to="/books/add" icon="＋" title="Add New Book" desc="Register a book into the collection" />
        <QuickCard to="/members/register" icon="🎓" title="Register Member" desc="Onboard a new library member" />
        <QuickCard to="/issues" icon="↗" title="Issue Book" desc="Lend a book to a member" />
        <QuickCard to="/returns" icon="↩" title="Return Book" desc="Process a book return" />
      </div>
    </div>
  )
}

function QuickCard({ to, icon, title, desc }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-5 bg-paper-50 border border-ink/10 rounded-sm shadow-book hover:shadow-book-hover hover:-translate-y-px transition-all duration-150">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-body font-semibold text-sm text-ink">{title}</p>
        <p className="font-body text-xs text-ink/45 mt-0.5">{desc}</p>
      </div>
    </Link>
  )
}
