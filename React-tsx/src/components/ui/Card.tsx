import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: string
  description?: string
  action?: ReactNode
}

export function Card({ title, description, action, children, className = '', ...props }: CardProps) {
  return (
    <section {...props} className={`min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="mt-1 text-sm text-[var(--text-subtle)]">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
