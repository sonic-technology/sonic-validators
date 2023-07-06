import { ValidationChain } from 'express-validator'

/**
 * Evaluates if field is required or not. Add values that are accepted as optional if necessary.
 * @param chain
 * @param required
 * @param optionalValues
 * @param optionalReplaceValue
 */
export const OptionalFieldRule = (
    chain: ValidationChain,
    required: boolean,
    optionalValues: any[] = [null, ''],
    optionalReplaceValue: undefined | null = undefined
): ValidationChain => {
    if (required === true) {
        return chain
    } else {
        return chain.replace(optionalValues, optionalReplaceValue).optional({ nullable: true })
    }
}
