import type { HTMLAttributes } from 'react'

/** Decorative by default. Supply a translated label for a standalone loader. */
export function Spinner({ label }: { label?: string }) {
  return (
    <span role={label ? 'status' : undefined} aria-hidden={label ? undefined : true} className="inline-flex items-center gap-2">
      <span className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}

export function Skeleton({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} aria-hidden="true" className={`animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800 ${className}`} />
}
