import { Form, useActionData, useNavigation } from '@remix-run/react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { FormError } from '~/components/common'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface AuthFormProps {
    buttonText: string
    buttonIcon: JSX.Element
}

export const AuthForm = (props: AuthFormProps) => {
    const { t } = useTranslation('auth')
    let actionData = useActionData()
    const navigation = useNavigation()
    const toast = useToast()

    const emailError = actionData?.email
    const passwordError = actionData?.password

    const toastId = 'formToast'
    useEffect(() => {
        if (actionData?._e && !toast.isActive(toastId)) {
            toast({
                id: toastId,
                title: t(actionData._e, { ns: 'validation' }),
                status: 'error',
                isClosable: true,
            })
        }
    }, [actionData?._e, toast, toastId, t])

    const resetActionError = () => {
        if (actionData?._e) {
            actionData._e = null
        }
    }

    return (
        <Form method="post">
            <Stack spacing="4">
                <FormControl isInvalid={emailError}>
                    <FormLabel>{t('email')}</FormLabel>
                    <Input name="email" />
                    <FormError error={emailError} />
                </FormControl>
                <FormControl isInvalid={passwordError}>
                    <FormLabel>{t('password')}</FormLabel>
                    <Input type="password" name="password" />
                    <FormError error={passwordError} />
                </FormControl>
                <Box textAlign="center">
                    <Button
                        onClick={resetActionError}
                        type="submit"
                        leftIcon={props.buttonIcon}
                        colorScheme="purple"
                        isLoading={navigation.state === 'submitting'}
                    >
                        {props.buttonText}
                    </Button>
                </Box>
            </Stack>
        </Form>
    )
}
