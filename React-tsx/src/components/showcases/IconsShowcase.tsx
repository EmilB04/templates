import { useState } from 'react'
import { Heart } from 'lucide-react'
import { FiThumbsUp } from 'react-icons/fi'
import { RiReactjsLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function IconsShowcase() {
  const { t } = useTranslation()
  const [favorite, setFavorite] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <ShowcaseCard title={t('components.icons.title')} description={t('components.icons.description')}>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" aria-pressed={favorite} onClick={() => setFavorite((value) => !value)}>
            <Heart aria-hidden="true" className={`size-4 ${favorite ? 'fill-current text-rose-600 dark:text-rose-400' : ''}`} />
            {t(favorite ? 'components.icons.favorited' : 'components.icons.favorite')}
          </Button>
          <Button variant="secondary" aria-pressed={liked} onClick={() => setLiked((value) => !value)}>
            <FiThumbsUp aria-hidden="true" className={`size-4 ${liked ? 'text-[var(--accent)]' : ''}`} />
            {t(liked ? 'components.icons.liked' : 'components.icons.like')}
          </Button>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-4 text-sm text-[var(--text-subtle)]">
          <RiReactjsLine aria-hidden="true" className="size-8 shrink-0 text-[var(--accent)]" />
          <p>{t('components.icons.hint')}</p>
        </div>
      </div>
    </ShowcaseCard>
  )
}
