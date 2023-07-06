import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { PhoneNumberRule } from './rules/PhoneNumberRule'

export class PhoneNumberValidator extends AbstractValidator {
    public constructor(options: AbstractValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid phone number',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = chain.trim() // cut off spaces at the beginning and end of string
        chain = PhoneNumberRule(chain)
        return chain.withMessage(this.error)
    }
}
