export interface FormValidationError {
    message: string
    type: string
    params: Record<string, unknown>
}

export interface FormValidationErrors {
    [key: string]: FormValidationError
}
