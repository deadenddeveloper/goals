import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Link,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Link as ReachLink } from '@remix-run/react'
import { SocialLogin } from '~/components/auth'

const Login = () => {
    const { t } = useTranslation('auth')

    return (
        <Stack
            maxW="container.sm"
            mx="auto"
            boxShadow="lg"
            borderRadius="lg"
            p="4"
            spacing="4"
        >
            <Heading as="h1" size="md" textAlign="center">
                {t('login')}
            </Heading>
            <FormControl>
                <FormLabel>{t('email')}</FormLabel>
                <Input type="email" />
            </FormControl>
            <FormControl>
                <FormLabel>{t('password')}</FormLabel>
                <Input type="password" />
            </FormControl>
            <Box textAlign="center">
                <Button
                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                    colorScheme="purple"
                >
                    {t('login_with_email')}
                </Button>
            </Box>
            <Box textAlign="center">
                <Link to="/signup" as={ReachLink}>
                    {t('to_signup')}
                </Link>
            </Box>
            <Divider />
            <Box textAlign="center">
                <Text color="gray">{t('login_social')}</Text>
            </Box>
            <SocialLogin />
        </Stack>
    )
}

export default Login
