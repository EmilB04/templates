import { useTranslation } from 'react-i18next'
import FeedbackShowcase from './showcases/FeedbackShowcase'
import FormShowcase from './showcases/FormShowcase'
import LoadingShowcase from './showcases/LoadingShowcase'
import ProjectsShowcase from './showcases/ProjectsShowcase'
import MotionShowcase from './showcases/MotionShowcase'
import IconsShowcase from './showcases/IconsShowcase'

export default function ComponentShowcase() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="components-heading" className="mx-auto w-full max-w-5xl px-6 pb-20">
      <div className="mb-8 border-t border-[var(--border)] pt-10">
        <p className="mb-2 text-sm font-semibold text-[var(--accent)]">{t('components.eyebrow')}</p>
        <h2 id="components-heading" className="text-3xl font-bold tracking-tight">{t('components.title')}</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-subtle)]">{t('components.description')}</p>
      </div>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <FormShowcase />
        <ProjectsShowcase />
        <FeedbackShowcase />
        <LoadingShowcase />
        <MotionShowcase />
        <IconsShowcase />
      </div>
    </section>
  )
}
