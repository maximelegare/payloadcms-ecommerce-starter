const locales = [
  { locale: 'fr', labels: { fr: 'Français', en: 'French' } },
  { locale: 'en', labels: { fr: 'Anglais', en: 'English' } },
]

const localesCodes = locales.map((l) => l.locale)

const defaultLocale = 'fr'

export { locales, defaultLocale }
