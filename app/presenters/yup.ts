import type { ValidationError } from 'yup'
import type { FormValidationErrors } from '~/types'

const prepareParams = (type: string, params: Record<string, unknown>) => {
    const fieldsWithCount = ['min']

    if (fieldsWithCount.includes(type)) {
        return { ...params, count: 0 }
    }

    return params
}

export const presentYupValidationError = (error: ValidationError) => {
    const errors = {} as FormValidationErrors

    if (error.inner) {
        error.inner.forEach((err) => {
            errors[err.path as string] = {
                message: err.message,
                type: err.type || '',
                params: prepareParams(err.type || '', err.params || {}),
            }
        })
    }

    return errors
}
