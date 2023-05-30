import type { ActionArgs } from '@remix-run/node'

import { useTranslation } from 'react-i18next'
import { Box, Divider, Heading, Stack, Text, Link } from '@chakra-ui/react'
import { Link as ReachLink } from '@remix-run/react'
import { AuthForm, SocialLogin } from '~/components/auth'
import { login } from '~/services/auth'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { route } from '~/services/routes'

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData()
    const email = form.get('email') as string
    const password = form.get('password') as string

    return login(email, password)
}

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

            <AuthForm
                buttonText={t('login_with_email')}
                buttonIcon={<FontAwesomeIcon icon={faRightToBracket} />}
            />

            <Box textAlign="center">
                <Link to={route('signup')} as={ReachLink}>
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
