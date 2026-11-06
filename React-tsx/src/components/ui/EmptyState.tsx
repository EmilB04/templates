import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export function EmptyState({ title, description, action, icon = <Inbox aria-hidden="true" className="size-6" /> }: {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-[var(--border)] px-5 py-8 text-center">
      <div className="mb-3 rounded-xl bg-[var(--surface)] p-3 text-[var(--text-subtle)]">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-subtle)]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
