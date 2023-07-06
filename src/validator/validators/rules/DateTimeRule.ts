import { ValidationChain } from 'express-validator'
import moment from 'moment'

/**
 * Checks if datetime is in the correct format.
 * @param chain
 * @param format
 */
const DateTimeRule = (chain: ValidationChain, format: string = 'YYYY-MM-DDTHH:mm:ssZ'): ValidationChain => {
    return chain.custom((value) => {
        return moment(value, format, true).isValid()
    })
}

export { DateTimeRule }
