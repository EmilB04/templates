import type { ComponentProps } from 'react'
import { Spinner } from './Spinner'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
}

const variants = {
  primary: 'border-transparent bg-[color:color-mix(in_srgb,var(--accent)_75%,black)] text-white hover:brightness-90 dark:bg-[var(--accent)] dark:text-gray-950',
  secondary: 'border-[var(--border)] bg-[var(--surface-card)] text-[var(--text)] hover:border-[var(--accent)]',
  danger: 'border-transparent bg-red-700 text-white hover:bg-red-800',
}

export function Button({ variant = 'primary', loading = false, disabled, children, className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
