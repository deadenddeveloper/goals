export enum GoalStatus {
    UNDONE = 'undone',
    DONE = 'done',
    ARCHIVED = 'archived',
}

export interface Goal {
    id: string
    title: string
    subtitle: string
    description: string
    deadline: string
    user_id: string
}
