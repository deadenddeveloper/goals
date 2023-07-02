import type { Goal as IGoal } from '~/types/goals'

import { Goal } from '~/db/models/goal'
import { goalSchema } from '~/validation/goal'
import { GoalStatus } from '~/types/goals'
import { redirect } from '@remix-run/node'
import { route } from '~/services/routes'
import { wrapError } from '~/services/error'

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

        await Goal.create({
            user_id: userId,
            ...validated,
            status: GoalStatus.UNDONE,
        })

        return redirect(route('dashboard'))
    } catch (error) {
        return wrapError(error as Error)
    }
}
