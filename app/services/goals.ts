import type { Goal as IGoal } from '~/types/goals'

import { Goal } from '~/db/models/goal'
import { goalSchema } from '~/validation/goal'
import { ValidationError } from 'yup'
import { presentYupValidationError } from '~/presenters/yup'
import { json } from '@remix-run/router'
import { FirebaseError } from '@firebase/app'

export const getGoals = async (userId: string) => {
    return await Goal.findAll({
        where: {
            user_id: userId,
        },
    })
}

export const createGoal = async (userId: string, data: Partial<IGoal>) => {
    try {
        const validated = await goalSchema.validate(data, { abortEarly: false })

        return await Goal.create({
            user_id: userId,
            ...validated,
        })
    } catch (error) {
        console.log(error)

        // TODO error reporting centralization
        if (error instanceof ValidationError) {
            return json(presentYupValidationError(error), 422)
        }

        if (error instanceof FirebaseError) {
            return json({ _e: error.code }, 422)
        }

        return null
    }
}
