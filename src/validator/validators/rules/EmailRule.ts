import { ValidationChain } from 'express-validator'

const NORMALIZE_EMAIL_SETTINGS = {
    gmail_convert_googlemaildotcom: false,
    gmail_remove_dots: false,
}

/**
 * Checks if email is a valid email and normalizes email.
 * @param chain
 */
export const EmailRule = (chain: ValidationChain): ValidationChain => {
    return chain.isEmail().bail().normalizeEmail(NORMALIZE_EMAIL_SETTINGS)
}
