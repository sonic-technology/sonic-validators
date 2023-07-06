import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { EmailRule } from './rules/EmailRule'

export class EmailValidator extends AbstractValidator {
    public constructor(options: AbstractValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid email',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = chain.trim() // cut off spaces at the beginning and end of string
        chain = EmailRule(chain)
        return chain.withMessage(this.error)
    }
}
