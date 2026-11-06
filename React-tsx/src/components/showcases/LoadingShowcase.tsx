import { useTranslation } from 'react-i18next'
import { Button, Skeleton, Spinner } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function LoadingShowcase() {
  const { t } = useTranslation()

  return (
    <ShowcaseCard title={t('components.loading.title')} description={t('components.loading.description')}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-4">
          <Button loading>{t('components.loading.saving')}</Button>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)]"><Spinner />{t('components.loading.preview')}</span>
        </div>
        <div aria-label={t('components.loading.skeleton')} role="img" className="flex items-center gap-4 rounded-xl border border-[var(--border)] p-4">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="w-full space-y-3">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </ShowcaseCard>
  )
}
