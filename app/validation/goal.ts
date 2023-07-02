import { date, object, string } from 'yup'

export const goalSchema = object({
    title: string().trim().required(),
    subtitle: string(),
    description: string(),
    deadline: date().required(),
})
