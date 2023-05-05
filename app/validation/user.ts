import { object, string } from 'yup'

export const userSchema = object({
    email: string().trim().email().required(),
    password: string().trim().min(8).required(),
})
