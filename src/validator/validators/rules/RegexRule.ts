import { ValidationChain } from 'express-validator'

/**
 * Checks if value matches regex.
 * @param chain
 * @param regex
 */
export const RegexRule = (chain: ValidationChain, regex: RegExp): ValidationChain => {
    return chain.matches(regex)
}
