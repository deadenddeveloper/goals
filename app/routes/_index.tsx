import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    Heading,
    Spacer,
    Text,
} from '@chakra-ui/react'
import { Footer } from '~/components/common'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { route } from '~/services/routes'
import { json } from '@remix-run/router'
import { isUserSignedIn } from '~/services/auth'
import type { LoaderArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderArgs) => {
    return json({ isUserSignedIn: await isUserSignedIn(request) })
}

const Index = () => {
    const { t } = useTranslation('auth')
    const { isUserSignedIn } = useLoaderData<typeof loader>()

    return (
        <Flex direction="column" minHeight="100vh">
            <Box as="header" py="2" textAlign="center" boxShadow="base">
                <Container maxW="container.lg" mx="auto">
                    <Flex gap="2" alignItems="center" minW="max-content">
                        <Link to={route('home')}>
                            <Text fontSize="lg">G O A L S</Text>
                        </Link>
                        <Spacer />
                        {isUserSignedIn ? (
                            <Link to={route('dashboard')}>
                                <Button>
                                    {t('dashboard', { ns: 'common' })}
                                </Button>
                            </Link>
                        ) : (
                            <ButtonGroup gap="2">
                                <Link to={route('login')}>
                                    <Button variant="outline">
                                        {t('login')}
                                    </Button>
                                </Link>
                                <Link to={route('signup')}>
                                    <Button>{t('signup')}</Button>
                                </Link>
                            </ButtonGroup>
                        )}
                    </Flex>
                </Container>
            </Box>

            <Box p="4">
                <Container maxW="container.lg">
                    <Heading textAlign="center">Landing page</Heading>
                </Container>
            </Box>

            <Flex as="main" flexGrow="1" alignItems="center" py="4">
                <Container maxW="container.lg">
                    <Outlet />
                </Container>
            </Flex>

            <Footer />
        </Flex>
    )
}

export default Index
