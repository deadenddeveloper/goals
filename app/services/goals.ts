import { Goal } from '~/db/models/goal'

export const getGoals = async (userId: string) => {
    return await Goal.findAll({
        where: {
            user_id: userId,
        },
    })
}
