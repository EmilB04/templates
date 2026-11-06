import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Button, TextField } from '../ui'
import ShowcaseCard from './ShowcaseCard'

export default function FormShowcase() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [saved, setSaved] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  function saveProfile(event: FormEvent) {
    event.preventDefault()
    const invalid = !name.trim()
    setNameError(invalid)
    setSaved(!invalid)
    if (invalid) nameRef.current?.focus()
  }

  return (
    <ShowcaseCard title={t('components.form.title')} description={t('components.form.description')}>
      <form noValidate onSubmit={saveProfile} className="space-y-5">
        <TextField
          ref={nameRef}
          label={t('components.form.name')}
          hint={t('components.form.hint')}
          error={nameError ? t('components.required') : undefined}
          value={name}
          required
          name="displayName"
          autoComplete="nickname"
          maxLength={80}
          onChange={(event) => { setName(event.target.value); setNameError(false); setSaved(false) }}
        />
        <div className="flex flex-wrap gap-3">
          <Button type="submit">{t('components.form.save')}</Button>
          <Button variant="secondary" onClick={() => { setName(''); setNameError(false); setSaved(false) }}>{t('components.reset')}</Button>
        </div>
        {saved && <Alert tone="success" title={t('components.form.success', { name: name.trim() })}>{t('components.localOnly')}</Alert>}
      </form>
    </ShowcaseCard>
  )
}
