import type { LoaderArgs } from '@remix-run/node'

import { Box, Button, Container, Flex, Spacer, Text } from '@chakra-ui/react'
import { Form, Link, Outlet } from '@remix-run/react'
import { authMiddleware } from '~/middleware/auth'
import { Footer } from '~/components/common'
import { useTranslation } from 'react-i18next'
import { route } from '~/services/routes'

export const loader = async ({ request }: LoaderArgs) =>
    authMiddleware(request, '/login', false)

const Dashboard = () => {
    const { t } = useTranslation('auth')

    return (
        <Flex direction="column" minHeight="100vh">
            <Box as="header" py="2" textAlign="center" boxShadow="base">
                <Container maxW="container.lg" mx="auto">
                    <Flex gap="2" alignItems="center" minW="max-content">
                        <Link to={route('home')}>
                            <Text fontSize="lg">G O A L S</Text>
                        </Link>

                        <Spacer />

                        <Form action={route('logout')} method="post">
                            <Button type="submit">{t('logout')}</Button>
                        </Form>
                    </Flex>
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

export default Dashboard
