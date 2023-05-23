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
import { Link, Outlet } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const Index = () => {
    const { t } = useTranslation('auth')

    return (
        <Flex direction="column" minHeight="100vh">
            <Box as="header" py="2" textAlign="center" boxShadow="base">
                <Container maxW="container.lg" mx="auto">
                    <Flex gap="2" alignItems="center" minW="max-content">
                        <Link to="/">
                            <Text fontSize="lg">G O A L S</Text>
                        </Link>
                        <Spacer />
                        <ButtonGroup gap="2">
                            <Link to="/login">
                                <Button variant="outline">{t('login')}</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>{t('signup')}</Button>
                            </Link>
                        </ButtonGroup>
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
