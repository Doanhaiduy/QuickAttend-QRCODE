import * as dateFnsLocales from 'date-fns/locale';
import { Locale } from 'date-fns';

import i18n from './i18n';

interface Locales {
    [key: string]: Locale;
}

console.log('lang', i18n.language);

const getDateFnsLocale = (): Locale => {
    const locales: Locales = {
        vi: dateFnsLocales.vi,
        en: dateFnsLocales.enUS,
    };

    return locales[i18n.language];
};

export default getDateFnsLocale;
