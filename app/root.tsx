import { ChakraProvider, Box, Heading, Text } from '@chakra-ui/react'
import type { MetaFunction } from '@remix-run/node'
import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
    V2_MetaFunction,
} from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'Very cool app | Remix' },
        {
            property: 'og:title',
            content: 'Very cool app',
        },
        {
            name: 'description',
            content: 'This app is the best',
        },
    ]
}

function Document({
    children,
    title = 'App title',
}: {
    children: React.ReactNode
    title?: string
}) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <title>{title}</title>
                <Links />
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

export default function App() {
    return (
        <Document>
            <ChakraProvider>
                <Outlet />
            </ChakraProvider>
        </Document>
    )
}

export function ErrorBoundary() {
    let error = useRouteError()
    let content = null

    if (isRouteErrorResponse(error)) {
        content = (
            <>
                <Heading as="h1" bg="blue.500">
                    {error.status} {error.statusText}
                </Heading>
                <Text>{error.data}</Text>
            </>
        )
    } else if (error instanceof Error) {
        content = (
            <>
                <Heading as="h1" bg="blue.500">
                    Error
                </Heading>
                <Text>{error.message}</Text>
                <Text>The stack trace is:</Text>
                <pre>{error.stack}</pre>
            </>
        )
    } else {
        content = <Heading>Unknown Error</Heading>
    }

    return (
        <Document title="Error!">
            <ChakraProvider>
                <Box>{content}</Box>
            </ChakraProvider>
        </Document>
    )
}
