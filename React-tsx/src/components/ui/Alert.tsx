import type { ReactNode } from 'react'
import { CircleCheck, Info, TriangleAlert } from 'lucide-react'

const tones = {
  info: { Icon: Info, styles: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200' },
  success: { Icon: CircleCheck, styles: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' },
  error: { Icon: TriangleAlert, styles: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200' },
}

export function Alert({ tone = 'info', title, children }: { tone?: keyof typeof tones; title: string; children?: ReactNode }) {
  const { Icon, styles } = tones[tone]
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-xl border p-4 text-sm ${styles}`}>
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}
