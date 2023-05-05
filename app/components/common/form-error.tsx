import type { FormValidationError } from '~/types'

import { FormErrorMessage } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface FormErrorProps {
    error: FormValidationError
}

export const FormError = (props: FormErrorProps) => {
    const { t } = useTranslation('validation')

    if (!props.error) {
        return null
    }

    const message = t(props.error.type, props.error.params)

    return props.error && <FormErrorMessage>{message}</FormErrorMessage>
}
