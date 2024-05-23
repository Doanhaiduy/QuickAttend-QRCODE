import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import vi from '../locales/vi.json';

const resources = {
    en: {
        translation: en,
    },
    vi: {
        translation: vi,
    },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources,
    cleanCode: true,
    react: {
        useSuspense: false,
    },
});

export default i18n;
