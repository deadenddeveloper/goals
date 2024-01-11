import type { IGoal } from '~/types/goals'

interface GoalProps {
    goal: IGoal
}

export const Goal = ({ goal }: GoalProps) => {
    return (
        <div>
            <h1>{goal.title}</h1>
        </div>
    )
}
