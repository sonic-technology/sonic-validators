import { ValidationChain } from 'express-validator'
import $ from 'bucks-js'

/**
 * Checks if phone number is valid.
 * @param chain
 */
export const PhoneNumberRule = (chain: ValidationChain): ValidationChain => {
    return chain.custom((value) => {
        return value && $.string.isPhone(value)
    })
}
