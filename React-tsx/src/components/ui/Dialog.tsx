import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export function Dialog({ open, onClose, title, description, closeLabel, children }: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  closeLabel: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
      className="m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-6 text-[var(--text)] shadow-xl backdrop:bg-black/50 dark:bg-gray-950"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} className="text-xl font-semibold">{title}</h2>
          {description && <p id={descriptionId} className="mt-2 text-sm text-[var(--text-subtle)]">{description}</p>}
        </div>
        <button type="button" aria-label={closeLabel} onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-xl hover:bg-[var(--surface-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      {children}
    </dialog>,
    document.body,
  )
}
