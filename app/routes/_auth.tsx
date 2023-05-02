import { Link, Outlet } from '@remix-run/react'
import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { LangSwitcher } from '~/components'

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
            <Box as="footer" py="2" boxShadow="base">
                <Container maxW="container.lg">
                    <Flex justifyContent="space-between" alignItems="center">
                        <HStack>
                            <Text fontSize="sm">© 2023</Text>
                            <a href="https://romanmeyer.dev" target="_blank">
                                Roman Meyer
                            </a>
                        </HStack>
                        <LangSwitcher></LangSwitcher>
                    </Flex>
                </Container>
            </Box>
        </Flex>
    )
}

export default Auth
