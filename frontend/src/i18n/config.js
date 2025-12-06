import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLocale from './locales/en.json';
import esLocale from './locales/es.json';
import frLocale from './locales/fr.json';

const resources = {
  en: { translation: enLocale },
  es: { translation: esLocale },
  fr: { translation: frLocale },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
