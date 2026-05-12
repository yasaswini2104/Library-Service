import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { memberService } from '../services/memberService'
import { Alert, FormField, Ornament, PageHeader } from '../components/ui'

export default function RegisterMemberPage() {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setError('')
    setSuccess(null)
    try {
      const res = await memberService.registerMember(data)
      setSuccess(res.data)
      reset()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-enter max-w-lg">
      <PageHeader
        title="Register Member"
        subtitle="Onboard a new library member"
        action={<Link to="/members" className="btn-secondary text-sm">← Members</Link>}
      />

      <div className="card">
        {success && (
          <div className="mb-5">
            <Alert type="success" message={`${success.name} registered successfully! Member ID: ${success.memberId}`} onDismiss={() => setSuccess(null)} />
          </div>
        )}
        {error && (
          <div className="mb-5">
            <Alert type="error" message={error} onDismiss={() => setError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label="Full Name" error={errors.name?.message}>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input-field"
              placeholder="e.g. Priya Sharma"
            />
          </FormField>

          <FormField label="Email Address" error={errors.email?.message}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' }
              })}
              type="email"
              className="input-field"
              placeholder="e.g. priya@example.com"
            />
          </FormField>

          <Ornament />

          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Registering…' : '＋ Register Member'}
            </button>
            <button type="button" onClick={() => reset()} className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>

      <p className="font-mono text-xs text-ink/25 mt-4 uppercase tracking-widest">Each email address must be unique across all members.</p>
    </div>
  )
}
