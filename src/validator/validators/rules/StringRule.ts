import { ValidationChain } from 'express-validator'
import $ from 'bucks-js'

/**
 * Checks if string is valid.
 * @param chain
 */
export const StringRule = (chain: ValidationChain): ValidationChain => {
    return chain.custom((value) => {
        return value && $.string.is(value)
    })
}
