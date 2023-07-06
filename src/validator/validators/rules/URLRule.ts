import { ValidationChain } from 'express-validator'

/**
 * Checks if url is a valid url.
 * @param chain
 */
export const URLRule = (chain: ValidationChain): ValidationChain => {
    return chain.isURL()
}
