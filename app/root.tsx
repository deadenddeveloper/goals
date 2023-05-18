import type { LoaderArgs } from '@remix-run/node'
import type { LinksFunction } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'

import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'
import { ServerStyleContext, ClientStyleContext } from './context'
import i18next from '~/i18n/i18n.server'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next'
import { json } from '@remix-run/router'
import { i18nCookie } from '~/i18n/cookie'
import { theme } from '../theme'

export const loader = async (args: LoaderArgs) => {
    const locale = await i18next.getLocale(args.request)
    const t = await i18next.getFixedT(args.request, 'common')
    const title = t('title')
    return json(
        { locale, title },
        {
            headers: { 'Set-Cookie': await i18nCookie.serialize(locale) },
        }
    )
}

export const handle = {
    i18n: ['common'],
}

export const meta: V2_MetaFunction = ({ data }) => {
    return [
        { title: data.title },
        {
            property: 'og:title',
            content: data.title,
        },
        {
            name: 'description',
            content: 'This app is the best',
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
    ]
}

export let links: LinksFunction = () => {
    return [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
        },
    ]
}

interface DocumentProps {
    children: React.ReactNode
}

const Document = withEmotionCache(
    ({ children }: DocumentProps, emotionCache) => {
        const serverStyleData = useContext(ServerStyleContext)
        const clientStyleData = useContext(ClientStyleContext)

        // Only executed on client
        useEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head
            // re-inject tags
            const tags = emotionCache.sheet.tags
            emotionCache.sheet.flush()
            tags.forEach((tag) => {
                ;(emotionCache.sheet as any)._insertTag(tag)
            })
            // reset cache to reapply global styles
            clientStyleData?.reset()
        }, [])

        const { i18n } = useTranslation()
        const { locale } = useLoaderData()
        useChangeLanguage(locale)

        return (
            <html lang={i18n.language}>
                <head>
                    <Meta />
                    <Links />
                    {serverStyleData?.map(({ key, ids, css }) => (
                        <style
                            key={key}
                            data-emotion={`${key} ${ids.join(' ')}`}
                            dangerouslySetInnerHTML={{ __html: css }}
                        />
                    ))}
                </head>
                <body>
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        )
    }
)

export default function App() {
    return (
        <Document>
            <ChakraProvider
                theme={theme}
                toastOptions={{ defaultOptions: { position: 'top-right' } }}
            >
                <Outlet />
            </ChakraProvider>
        </Document>
    )
}
