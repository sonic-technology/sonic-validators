import { ValidationChain } from 'express-validator'

/**
 * Evaluates if value is too long or too short. Counts chars or digits. (String length & "Int length")
 * @param chain
 * @param min
 * @param max
 */
export const LengthRule = (chain: ValidationChain, min?: number, max?: number): ValidationChain => {
    return chain.isLength({
        min: min ?? undefined,
        max: max ?? undefined,
    })
}
