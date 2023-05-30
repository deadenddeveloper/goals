import { Goal } from '~/services/db'

export const getGoals = async (userId: string) => {
    await Goal.sync() // TODO dev?
    return await Goal.findAll({
        where: {
            user_id: userId,
        },
    })
}
