import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Folder, Plus } from 'lucide-react'
import { Button, Dialog, EmptyState, TextField } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function ProjectsShowcase() {
  const { t } = useTranslation()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectError, setProjectError] = useState(false)
  const [projects, setProjects] = useState<string[]>([])
  const projectRef = useRef<HTMLInputElement>(null)

  function createProject(event: FormEvent) {
    event.preventDefault()
    if (!projectName.trim()) {
      setProjectError(true)
      projectRef.current?.focus()
      return
    }
    setProjects((current) => [...current, projectName.trim()])
    setDialogOpen(false)
  }

  function openDialog() {
    setProjectName('')
    setProjectError(false)
    setDialogOpen(true)
  }

  return (
    <>
      <ShowcaseCard title={t('components.projects.title')} description={t('components.projects.description')}>
        {projects.length === 0 ? (
          <EmptyState
            title={t('components.projects.empty')}
            description={t('components.projects.emptyDescription')}
            action={<Button onClick={openDialog}><Plus aria-hidden="true" className="size-4" />{t('components.projects.add')}</Button>}
          />
        ) : (
          <div className="space-y-4">
            <ul className="space-y-2" aria-label={t('components.projects.title')}>
              {projects.map((project, index) => (
                <li key={index} className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3">
                  <Folder aria-hidden="true" className="size-5 shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0 break-words text-sm font-medium">{project}</span>
                </li>
              ))}
            </ul>
            <p role="status" className="text-sm text-[var(--text-subtle)]">{t('components.projects.count', { count: projects.length })}</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={openDialog}><Plus aria-hidden="true" className="size-4" />{t('components.projects.add')}</Button>
              <Button variant="secondary" onClick={() => setProjects([])}>{t('components.reset')}</Button>
            </div>
          </div>
        )}
      </ShowcaseCard>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={t('components.projects.dialogTitle')}
        description={t('components.localOnly')}
        closeLabel={t('components.close')}
      >
        <form noValidate onSubmit={createProject} className="space-y-5">
          <TextField
            ref={projectRef}
            label={t('components.projects.name')}
            value={projectName}
            error={projectError ? t('components.required') : undefined}
            onChange={(event) => { setProjectName(event.target.value); setProjectError(false) }}
            name="projectName"
            maxLength={80}
            required
          />
          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>{t('components.cancel')}</Button>
            <Button type="submit">{t('components.projects.create')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  )
}
