import { ValidationChain } from 'express-validator'
import $ from 'bucks-js'

/**
 * Checks if object is valid.
 * @param chain
 */
export const ObjectRule = (chain: ValidationChain): ValidationChain => {
    return chain.custom((value) => {
        return value && $.object.is(value)
    })
}
