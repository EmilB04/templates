import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiPlay } from 'react-icons/fi'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function MotionShowcase() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [runs, setRuns] = useState(0)

  return (
    <ShowcaseCard title={t('components.motion.title')} description={t('components.motion.description')}>
      <div className="space-y-4">
        <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <motion.div
            key={runs}
            initial={{ x: 0, rotate: 0, scale: 1 }}
            animate={runs > 0 && !reducedMotion ? { x: [0, 40, -40, 0], rotate: [0, 12, -12, 0], scale: [1, 1.1, 1.1, 1] } : { x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="flex size-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] text-[var(--accent)]"
          >
            <Sparkles aria-hidden="true" className="size-6" />
          </motion.div>
        </div>
        <Button onClick={() => setRuns((value) => value + 1)} disabled={!!reducedMotion}>
          <FiPlay aria-hidden="true" className="size-4" />{t('components.motion.play')}
        </Button>
        <p role="status" className="text-sm text-[var(--text-subtle)]">
          {reducedMotion ? t('components.motion.reduced') : t('components.motion.runs', { count: runs })}
        </p>
      </div>
    </ShowcaseCard>
  )
}
