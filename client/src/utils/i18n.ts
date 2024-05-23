import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLang from '../locales/en.json';
import viLang from '../locales/vi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
    en: {
        translation: enLang,
    },
    vi: {
        translation: viLang,
    },
};

const i18n = i18next.createInstance();

const initI18n = async () => {
    const storedLanguage = await AsyncStorage.getItem('language');
    const language: string = storedLanguage || 'en';

    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        debug: true,
        lng: language,
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
};

initI18n();

export default i18n;
