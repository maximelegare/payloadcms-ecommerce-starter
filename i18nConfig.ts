import { defaultLocale, locales } from "~/_constants/locales";
import { Config } from 'next-i18n-router/dist/types';

export const i18nConfig:Config = {
  defaultLocale,
  locales: locales.map((l) => l.locale)
};

export type Locale = (typeof i18nConfig)["locales"][number];