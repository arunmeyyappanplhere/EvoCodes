import { Loader2, AlertTriangle } from 'lucide-react'

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-secondary">
      <Loader2 className="animate-spin mb-3" size={22} />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-secondary text-center">
      <AlertTriangle className="mb-3 text-amber-400" size={22} />
      <p className="text-sm mb-4">{message || 'Something went wrong loading this content.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-mono px-4 py-2 rounded-full border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-secondary text-center">
      <p className="text-sm">{message}</p>
    </div>
  )
}