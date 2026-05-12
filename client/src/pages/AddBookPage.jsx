import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bookService } from '../services/bookService'
import { Alert, FormField, Ornament, PageHeader } from '../components/ui'

export default function AddBookPage() {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    setSuccess(null)
    try {
      const res = await bookService.addBook(data)
      setSuccess(res.data)
      reset()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-enter max-w-lg">
      <PageHeader
        title="Add New Book"
        subtitle="Register a new title into the collection"
        action={<Link to="/books" className="btn-secondary text-sm">← Back to Books</Link>}
      />

      <div className="card">
        {success && (
          <div className="mb-5">
            <Alert type="success" message={`"${success.title}" has been added successfully. ID: ${success.bookId}`} onDismiss={() => setSuccess(null)} />
          </div>
        )}
        {error && (
          <div className="mb-5">
            <Alert type="error" message={error} onDismiss={() => setError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label="Book Title" error={errors.title?.message}>
            <input
              {...register('title', { required: 'Title is required' })}
              className="input-field"
              placeholder="e.g. The Great Gatsby"
            />
          </FormField>

          <FormField label="Author" error={errors.author?.message}>
            <input
              {...register('author', { required: 'Author is required' })}
              className="input-field"
              placeholder="e.g. F. Scott Fitzgerald"
            />
          </FormField>

          <Ornament />

          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Adding…' : '＋ Add Book'}
            </button>
            <button type="button" onClick={() => reset()} className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>

      <p className="font-mono text-xs text-ink/25 mt-4 uppercase tracking-widest">Books are marked available by default upon creation.</p>
    </div>
  )
}
