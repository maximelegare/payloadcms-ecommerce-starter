'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { defaultLocale, locales } from '~/_constants/locales'
import { useCurrentLocale } from 'next-i18n-router/client'
import { i18nConfig } from '@@/i18nConfig'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../_SHADCN/Select/select'

export const LanguageChanger = () => {
  const currentLocale = useCurrentLocale(i18nConfig)

  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    // redirect to the new locale path
    if (currentLocale === defaultLocale) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <Select value={currentLocale} onValueChange={handleChange}>
      <SelectTrigger className='w-[160px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map(l => (
            <SelectItem key={l.locale} value={l.locale}>
              {l.labels[currentLocale]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
