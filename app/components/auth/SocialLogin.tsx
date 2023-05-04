import { Button, Stack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faGithub,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons'

export const SocialLogin = () => {
    return (
        <Stack direction="row" justify="center" spacing="4">
            <Button
                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                colorScheme="purple"
                variant="outline"
            >
                Google
            </Button>
            <Button
                leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                colorScheme="purple"
                variant="outline"
            >
                Facebook
            </Button>
            <Button
                leftIcon={<FontAwesomeIcon icon={faGithub} />}
                colorScheme="purple"
                variant="outline"
            >
                Github
            </Button>
        </Stack>
    )
}
