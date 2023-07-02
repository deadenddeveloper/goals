import { ValidationError } from 'yup'
import { json } from '@remix-run/router'
import { presentYupValidationError } from '~/presenters/yup'
import { FirebaseError } from '@firebase/app'

export const wrapError = (error: Error) => {
    if (error instanceof ValidationError) {
        return json(presentYupValidationError(error), 422)
    }

    if (error instanceof FirebaseError) {
        return json({ _e: error.code }, 422)
    }

    return null
}
