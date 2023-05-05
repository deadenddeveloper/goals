import type { ActionArgs } from '@remix-run/node'

import { useTranslation } from 'react-i18next'
import { Box, Divider, Heading, Stack, Text, Link } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link as ReachLink } from '@remix-run/react'
import { AuthForm, SocialLogin } from '~/components/auth'
import { signup } from '~/services/auth'

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData()
    const email = form.get('email') as string
    const password = form.get('password') as string

    return signup(email, password)
}

const Signup = () => {
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
                {t('signup')}
            </Heading>

            <AuthForm
                buttonText={t('signup_with_email')}
                buttonIcon={<FontAwesomeIcon icon={faUser} />}
            />

            <Box textAlign="center">
                <Link to="/login" as={ReachLink}>
                    {t('to_login')}
                </Link>
            </Box>
            <Divider />
            <Box textAlign="center">
                <Text color="gray">{t('signup_social')}</Text>
            </Box>
            <SocialLogin />
        </Stack>
    )
}

export default Signup
