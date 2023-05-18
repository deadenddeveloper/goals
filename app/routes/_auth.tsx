import { Link, Outlet } from '@remix-run/react'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import type { LoaderArgs } from '@remix-run/node'

import { authMiddleware } from '~/middleware/auth'
import { Footer } from '~/components/common'

export const loader = async ({ request }: LoaderArgs) =>
    authMiddleware(request, 'dashboard')

const Auth = () => {
    return (
        <Flex direction="column" minHeight="100vh">
            <Box as="header" py="2" textAlign="center" boxShadow="base">
                <Link to="/">
                    <Text fontSize="lg">G O A L S</Text>
                </Link>
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

export default Auth
