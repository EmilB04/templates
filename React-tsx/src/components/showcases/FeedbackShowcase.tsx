import { useTranslation } from 'react-i18next'
import { Alert, Button } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function FeedbackShowcase() {
  const { t } = useTranslation()

  return (
    <ShowcaseCard title={t('components.feedback.title')} description={t('components.feedback.description')}>
      <div className="space-y-3">
        <Alert title={t('components.feedback.info')}>{t('components.localOnly')}</Alert>
        <Alert tone="error" title={t('components.feedback.error')}>{t('components.feedback.errorDescription')}</Alert>
        <Button variant="danger" disabled>{t('components.feedback.disabled')}</Button>
      </div>
    </ShowcaseCard>
  )
}
