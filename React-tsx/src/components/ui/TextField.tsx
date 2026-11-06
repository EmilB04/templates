import { useId, type ComponentProps } from 'react'

type TextFieldProps = ComponentProps<'input'> & {
  label: string
  hint?: string
  error?: string
}

export function TextField({ label, hint, error, id, className = '', 'aria-describedby': describedBy, ...props }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = `${inputId}-description`
  const description = error || hint

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium">{label}</label>
      <input
        {...props}
        id={inputId}
        aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={[describedBy, description ? descriptionId : undefined].filter(Boolean).join(' ') || undefined}
        className={`min-h-11 w-full rounded-xl border bg-white px-3 py-2 text-[var(--text)] placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950 ${error ? 'border-red-600 dark:border-red-400' : 'border-[var(--border)]'} ${className}`}
      />
      {description && <p id={descriptionId} className={`text-sm ${error ? 'text-red-700 dark:text-red-300' : 'text-[var(--text-subtle)]'}`}>{description}</p>}
    </div>
  )
}
