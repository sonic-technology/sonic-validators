import { ValidationChain } from 'express-validator'

const UUID_REGEX: { [key: string]: RegExp } = {
    v1: /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    v2: /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    v3: /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    v4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    v5: /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
}

/**
 * Checks if uuid is valid.
 * @param chain
 * @param version
 */
export const UUIDRule = (chain: ValidationChain, version: number): ValidationChain => {
    return chain.custom((value) => {
        const uuidRegex = new RegExp(UUID_REGEX['v' + version])
        return uuidRegex.test(value)
    })
}
