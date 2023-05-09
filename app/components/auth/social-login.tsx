import type { AuthProvider, UserCredential } from 'firebase/auth'

import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faGithub,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import { useFetcher } from '@remix-run/react'
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'
import { auth } from '~/services/firebase'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const SocialLogin = () => {
    let [isProcessing, setIsProcessing] = useState(false)
    const fetcher = useFetcher()
    const toast = useToast()
    const { t } = useTranslation('auth')

    const onProviderSignIn = async (credential: UserCredential) => {
        fetcher.submit(
            { uid: credential.user.uid },
            { method: 'post', action: '/social' }
        )
    }

    const handleSocialLogin = async (provider: AuthProvider) => {
        setIsProcessing(true)

        try {
            await onProviderSignIn(await signInWithPopup(auth, provider))
        } catch (error) {
            console.log(error)
            toast({
                title: t('social_login_failed'),
                status: 'error',
                isClosable: true,
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const Overlay = () => {
        return (
            <Flex
                align="center"
                justify="center"
                pos="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                backgroundColor="rgba(255,255,255,0.95)"
                zIndex="modal"
            >
                <Text fontSize="2xl" align="center">
                    {t('follow_instructions')}
                </Text>
            </Flex>
        )
    }

    return (
        <Stack direction="row" justify="center" spacing="4">
            {isProcessing && <Overlay />}
            <Button
                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                colorScheme="purple"
                variant="outline"
                onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                isDisabled={isProcessing}
            >
                Google
            </Button>
            <Button
                leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                colorScheme="purple"
                variant="outline"
                onClick={() => handleSocialLogin(new FacebookAuthProvider())}
                isDisabled={isProcessing}
            >
                Facebook
            </Button>
            <Button
                leftIcon={<FontAwesomeIcon icon={faGithub} />}
                colorScheme="purple"
                variant="outline"
                onClick={() => handleSocialLogin(new GithubAuthProvider())}
                isDisabled={isProcessing}
            >
                Github
            </Button>
        </Stack>
    )
}
