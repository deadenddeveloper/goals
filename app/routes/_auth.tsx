import { Link, Outlet } from '@remix-run/react'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { LangSwitcher } from '~/components'
import { useTranslation } from 'react-i18next'

const Auth = () => {
    const { t } = useTranslation('common')

    return (
        <Flex direction="column" minHeight="100vh">
            <Box as="header" py="2" textAlign="center">
                <Link to="/">
                    <Text fontSize="lg">{t('title')}</Text>
                </Link>
            </Box>
            <Flex as="main" flexGrow="1" alignItems="center">
                <Container>
                    <LangSwitcher></LangSwitcher>
                    <Outlet />
                </Container>
            </Flex>
            <footer></footer>
        </Flex>
    )
}

export default Auth
