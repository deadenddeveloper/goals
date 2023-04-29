import type { EntryContext } from '@remix-run/node'

import { renderToString } from 'react-dom/server'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { RemixServer } from '@remix-run/react'
import { createInstance } from 'i18next'
import i18n from '~/i18n/i18n.server'
import { ServerStyleContext } from './context'
import createEmotionCache from './createEmotionCache'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import i18config from '~/i18n/config'

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const instance = createInstance()
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    const lng = await i18n.getLocale(request)
    const ns = i18n.getRouteNamespaces(remixContext)
    await instance
        .use(initReactI18next)
        .use(Backend)
        .init({
            ...i18config,
            lng,
            ns,
            backend: {
                loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
            },
        })

    const html = renderToString(
        <ServerStyleContext.Provider value={null}>
            <CacheProvider value={cache}>
                <RemixServer context={remixContext} url={request.url} />
            </CacheProvider>
        </ServerStyleContext.Provider>
    )

    const chunks = extractCriticalToChunks(html)

    const markup = renderToString(
        <ServerStyleContext.Provider value={chunks.styles}>
            <CacheProvider value={cache}>
                <I18nextProvider i18n={instance}>
                    <RemixServer context={remixContext} url={request.url} />
                </I18nextProvider>
            </CacheProvider>
        </ServerStyleContext.Provider>
    )

    responseHeaders.set('Content-Type', 'text/html')

    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders,
    })
}
