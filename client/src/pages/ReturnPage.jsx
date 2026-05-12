import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { issueService } from '../services/issueService'
import { Alert, FormField, Ornament, PageHeader } from '../components/ui'

function ReturnReceipt({ record }) {
  return (
    <div className="card border-l-4 border-l-sage page-enter">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">✅</span>
        <h3 className="font-display text-lg italic font-semibold text-ink">Book Returned Successfully</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm font-body">
        <DataRow label="Issue ID" value={`#${record.issueId}`} mono />
        <DataRow label="Book" value={`${record.bookTitle} (ID: ${record.bookId})`} />
        <DataRow label="Member" value={`${record.memberName} (ID: ${record.memberId})`} />
        <DataRow label="Issue Date" value={record.issueDate} />
        <DataRow label="Return Date" value={record.returnDate} accent />
      </div>
    </div>
  )
}

function DataRow({ label, value, mono, accent }) {
  return (
    <div className={`p-3 rounded-sm border ${accent ? 'bg-sage/5 border-sage/20' : 'bg-paper border-ink/8'}`}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/35 mb-0.5">{label}</p>
      <p className={`text-ink font-medium ${mono ? 'font-mono text-gold-600' : ''} ${accent ? 'text-sage-600' : ''}`}>{value}</p>
    </div>
  )
}

export default function ReturnPage() {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    setSuccess(null)
    try {
      const res = await issueService.returnBook(Number(data.issueId))
      setSuccess(res.data)
      reset()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-enter max-w-lg">
      <PageHeader title="Return Book" subtitle="Process a book return and update availability" />

      <div className="card mb-5">
        {error && (
          <div className="mb-5">
            <Alert type="error" message={error} onDismiss={() => setError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label="Issue ID" error={errors.issueId?.message}>
            <input
              {...register('issueId', {
                required: 'Issue ID is required',
                min: { value: 1, message: 'Must be a valid Issue ID' },
              })}
              type="number"
              className="input-field"
              placeholder="Enter the Issue Record ID"
              min="1"
            />
          </FormField>

          <Ornament />

          <div className="space-y-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
              {isSubmitting ? 'Processing…' : '↩ Return Book'}
            </button>
            <button type="button" onClick={() => { reset(); setSuccess(null); setError('') }} className="btn-secondary w-full justify-center text-xs">
              Clear
            </button>
          </div>
        </form>
      </div>

      {success && <ReturnReceipt record={success} />}

      <div className="mt-5 card bg-sage/5 border-sage/20">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-2">Notes</p>
        <ul className="space-y-1 text-xs font-body text-ink/50">
          <li>— Issue ID is found on the issue receipt or via member lookup</li>
          <li>— Books already returned cannot be returned again</li>
          <li>— Returning a book makes it available to other members immediately</li>
        </ul>
      </div>
    </div>
  )
}
