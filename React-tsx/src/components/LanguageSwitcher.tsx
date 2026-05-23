import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'no' : 'en');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
    >
      {i18n.language === 'en' ? 'NO' : 'EN'}
    </button>
  );
}
