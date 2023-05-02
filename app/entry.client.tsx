import React, { useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import { ClientStyleContext } from './context'
import createEmotionCache, { defaultCache } from './createEmotionCache'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getInitialNamespaces } from 'remix-i18next'
import i18config from '~/i18n/config'
import LocalStorageBackend from 'i18next-localstorage-backend'
import HttpBackend from 'i18next-http-backend'
import ChainedBackend from 'i18next-chained-backend'

interface ClientCacheProviderProps {
    children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
    const [cache, setCache] = useState(defaultCache)

    function reset() {
        setCache(createEmotionCache())
    }

    return (
        <ClientStyleContext.Provider value={{ reset }}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    )
}

if (!i18next.isInitialized) {
    i18next
        .use(ChainedBackend)
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            ...i18config,
            backend: {
                backends: [LocalStorageBackend, HttpBackend],
                backendOptions: [
                    {
                        expirationTime:
                            process.env.NODE_ENV !== 'production'
                                ? 0
                                : 7 * 24 * 60 * 60 * 1000,
                        versions: { en: 'v0.0.1', de: 'v0.0.1', ru: 'v0.0.1' },
                    },
                    {
                        loadPath: '/locales/{{lng}}/{{ns}}.json',
                    },
                ],
            },
            ns: getInitialNamespaces(),
            detection: {
                order: ['htmlTag'],
                caches: [],
            },
        })
        .then(() => {
            return hydrateRoot(
                document,
                <I18nextProvider i18n={i18next}>
                    <ClientCacheProvider>
                        <RemixBrowser />
                    </ClientCacheProvider>
                </I18nextProvider>
            )
        })
}
