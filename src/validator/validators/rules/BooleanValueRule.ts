import { ValidationChain } from 'express-validator'

/**
 * Checks if value is a required boolean value (true or false).
 * @param chain
 * @param requiredValue
 */
export const BooleanValueRule = (chain: ValidationChain, requiredValue?: boolean): ValidationChain => {
    return chain.custom((value) => {
        if (requiredValue === true || requiredValue === false) {
            return value === requiredValue
        } else {
            return true
        }
    })
}
