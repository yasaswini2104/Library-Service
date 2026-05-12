// Spinner
export function Spinner({ size = 'md' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  return (
    <div className={`${sizes[size]} border-2 border-ink/10 border-t-ink/50 rounded-full animate-spin`} />
  )
}

// Alert
export function Alert({ type = 'error', message, onDismiss }) {
  if (!message) return null
  const styles = {
    error: 'bg-crimson/8 border-crimson/25 text-crimson-600',
    success: 'bg-sage/8 border-sage/25 text-sage-600',
    warning: 'bg-gold/10 border-gold/30 text-ink',
  }
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border rounded-sm text-sm font-body ${styles[type]}`}>
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="opacity-50 hover:opacity-100 transition-opacity text-xs mt-0.5">✕</button>
      )}
    </div>
  )
}

// Empty State
export function EmptyState({ icon = '📭', title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3 opacity-40">{icon}</div>
      <p className="font-display text-lg italic text-ink/50">{title}</p>
      {subtitle && <p className="font-body text-sm text-ink/35 mt-1">{subtitle}</p>}
    </div>
  )
}

// Page Header
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="section-heading">{title}</h1>
        {subtitle && <p className="font-body text-sm text-ink/50 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// Badge
export function Badge({ available }) {
  return available
    ? <span className="badge-available"><span className="w-1.5 h-1.5 rounded-full bg-sage-500 inline-block" />Available</span>
    : <span className="badge-unavailable"><span className="w-1.5 h-1.5 rounded-full bg-crimson inline-block" />Issued</span>
}

// Loading Skeleton
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-ink/8 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Form Field
export function FormField({ label, error, children }) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      {children}
      {error && <p className="mt-1 text-xs text-crimson font-body">{error}</p>}
    </div>
  )
}

// Ornamental divider
export function Ornament() {
  return (
    <div className="divider-ornament">
      <div className="flex-1 h-px bg-ink/10" />
      <span className="text-gold/60 text-xs">✦</span>
      <div className="flex-1 h-px bg-ink/10" />
    </div>
  )
}
