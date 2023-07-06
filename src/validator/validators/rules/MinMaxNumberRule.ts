import { ValidationChain } from 'express-validator'
import $ from 'bucks-js'

/**
 * Checks if number is in minimum and maximum.
 * @param chain
 * @param min
 * @param max
 */
export const MinMaxNumberRule = (chain: ValidationChain, min?: number, max?: number): ValidationChain => {
    return chain.custom((value) => {
        let minValidationResult = true
        let maxValidationResult = true
        if (min !== undefined && min !== null) {
            // @ts-ignore
            minValidationResult = parseFloat(min) <= parseFloat(value)
        }
        if (max !== undefined && max !== null) {
            // @ts-ignore
            maxValidationResult = parseFloat(max) >= parseFloat(value)
        }
        return minValidationResult && maxValidationResult
    })
}
