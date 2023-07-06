import { ValidationChain } from 'express-validator'
import $ from 'bucks-js'

/**
 * Checks if value is in pool out of values.
 * @param chain
 * @param allow
 * @param valuesPool
 */
export const ValuesPoolRule = (
    chain: ValidationChain,
    allow: boolean,
    valuesPool?: string[] | number[]
): ValidationChain => {
    return chain.custom((value) => {
        if (valuesPool !== undefined) {
            if (allow) {
                return valuesPool.indexOf(value as never) > -1
            } else {
                return valuesPool.indexOf(value as never) === -1
            }
        } else {
            return true
        }
    })
}
