import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { issueService } from '../services/issueService'
import { Alert, FormField, Ornament, PageHeader } from '../components/ui'

function IssueReceipt({ record }) {
  return (
    <div className="card border-l-4 border-l-gold page-enter">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📤</span>
        <h3 className="font-display text-lg italic font-semibold text-ink">Book Issued Successfully</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm font-body">
        <DataRow label="Issue ID" value={`#${record.issueId}`} mono />
        <DataRow label="Issue Date" value={record.issueDate} />
        <DataRow label="Book" value={`${record.bookTitle} (ID: ${record.bookId})`} />
        <DataRow label="Member" value={`${record.memberName} (ID: ${record.memberId})`} />
        <DataRow label="Return Date" value={record.returnDate ?? 'Not returned yet'} />
      </div>
    </div>
  )
}

function DataRow({ label, value, mono }) {
  return (
    <div className="p-3 bg-paper rounded-sm border border-ink/8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/35 mb-0.5">{label}</p>
      <p className={`text-ink font-medium ${mono ? 'font-mono text-gold-600' : ''}`}>{value}</p>
    </div>
  )
}

export default function IssuePage() {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    setSuccess(null)
    try {
      const res = await issueService.issueBook({
        bookId: Number(data.bookId),
        memberId: Number(data.memberId),
      })
      setSuccess(res.data)
      reset()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-enter max-w-lg">
      <PageHeader title="Issue Book" subtitle="Lend a book to a registered member" />

      <div className="card mb-5">
        {error && (
          <div className="mb-5">
            <Alert type="error" message={error} onDismiss={() => setError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label="Book ID" error={errors.bookId?.message}>
            <input
              {...register('bookId', {
                required: 'Book ID is required',
                min: { value: 1, message: 'Must be a valid ID' },
              })}
              type="number"
              className="input-field"
              placeholder="Enter book ID"
              min="1"
            />
          </FormField>

          <FormField label="Member ID" error={errors.memberId?.message}>
            <input
              {...register('memberId', {
                required: 'Member ID is required',
                min: { value: 1, message: 'Must be a valid ID' },
              })}
              type="number"
              className="input-field"
              placeholder="Enter member ID"
              min="1"
            />
          </FormField>

          <Ornament />

          <div className="space-y-2">
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full justify-center">
              {isSubmitting ? 'Processing…' : '↗ Issue Book'}
            </button>
            <button type="button" onClick={() => { reset(); setSuccess(null); setError('') }} className="btn-secondary w-full justify-center text-xs">
              Clear
            </button>
          </div>
        </form>
      </div>

      {success && <IssueReceipt record={success} />}

      <div className="mt-5 card bg-gold/5 border-gold/20">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-2">Business Rules</p>
        <ul className="space-y-1 text-xs font-body text-ink/50">
          <li>— Book must be currently available</li>
          <li>— Member cannot hold more than 3 books at a time</li>
          <li>— Both Book ID and Member ID must exist in the system</li>
        </ul>
      </div>
    </div>
  )
}
