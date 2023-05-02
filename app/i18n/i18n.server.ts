import { resolve } from 'node:path'
import { RemixI18Next } from 'remix-i18next'
import config from '~/i18n/config'
import { i18nCookie } from '~/i18n/cookie'

export default new RemixI18Next({
    detection: {
        cookie: i18nCookie,
        supportedLanguages: config.supportedLngs,
        fallbackLanguage: config.fallbackLng,
    },
    i18next: {
        backend: {
            loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
        },
    },
})
