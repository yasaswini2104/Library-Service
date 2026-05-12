import { useState } from 'react'
import { Link } from 'react-router-dom'
import { memberService } from '../services/memberService'
import { Alert, EmptyState, PageHeader, Spinner, Ornament } from '../components/ui'

export default function MembersPage() {
  const [memberId, setMemberId] = useState('')
  const [member, setMember] = useState(null)
  const [issuedBooks, setIssuedBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const lookupMember = async (e) => {
    e.preventDefault()
    if (!memberId.trim()) return
    setLoading(true)
    setError('')
    setMember(null)
    setIssuedBooks([])
    try {
      const [mRes, bRes] = await Promise.all([
        memberService.getMemberById(memberId),
        memberService.getBooksIssuedToMember(memberId),
      ])
      setMember(mRes.data)
      setIssuedBooks(bRes.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter">
      <PageHeader
        title="Members"
        subtitle="Look up member details and issued books"
        action={<Link to="/members/register" className="btn-primary">＋ Register</Link>}
      />

      {/* Lookup form */}
      <div className="card max-w-md mb-6">
        <p className="label mb-3">Look up member by ID</p>
        <form onSubmit={lookupMember} className="flex gap-2">
          <input
            type="number"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Member ID…"
            min="1"
            className="input-field flex-1"
          />
          <button type="submit" disabled={loading || !memberId} className="btn-gold">
            {loading ? '…' : 'Find'}
          </button>
        </form>
      </div>

      {error && <Alert type="error" message={error} onDismiss={() => setError('')} />}

      {loading && (
        <div className="flex justify-center py-10"><Spinner /></div>
      )}

      {member && !loading && (
        <div className="space-y-5 page-enter">
          {/* Member card */}
          <div className="card">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-sm bg-gold/20 border border-gold/30 flex items-center justify-center text-xl shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold italic text-ink">{member.name}</h2>
                <p className="font-body text-sm text-ink/50 mt-0.5">{member.email}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="font-mono text-xs text-ink/30 uppercase tracking-widest">ID #{member.memberId}</span>
                  <span className="font-mono text-xs text-ink/30">·</span>
                  <span className="font-mono text-xs text-ink/50">{issuedBooks.length} / 3 books issued</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{ width: `${(issuedBooks.length / 3) * 100}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-ink/30 mt-1 uppercase tracking-widest">Book limit usage</p>
            </div>
          </div>

          {/* Issued books */}
          <div className="card">
            <h3 className="font-display text-lg italic font-semibold text-ink mb-4">Currently Issued Books</h3>
            {issuedBooks.length === 0 ? (
              <EmptyState icon="📭" title="No books currently issued" subtitle="This member has no active loans." />
            ) : (
              <div className="space-y-2">
                {issuedBooks.map((book) => (
                  <div key={book.bookId} className="flex items-center gap-4 p-3 bg-paper rounded-sm border border-ink/8">
                    <span className="font-mono text-xs text-ink/30 w-12">#{book.bookId}</span>
                    <div className="flex-1">
                      <p className="font-body font-medium text-sm text-ink">{book.title}</p>
                      <p className="font-body text-xs text-ink/45 italic">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!member && !loading && !error && (
        <EmptyState icon="🔍" title="Enter a Member ID to get started" subtitle="You can look up member details and their currently issued books." />
      )}
    </div>
  )
}
