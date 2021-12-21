import { createIntl, createIntlCache } from 'react-intl';

const cache = createIntlCache();
const locale = navigator.language.slice(0, 2);

export const intl = createIntl({
    locale
}, cache);

export const intlSettings = { locale };
