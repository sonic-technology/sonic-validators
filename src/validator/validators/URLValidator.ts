import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { URLRule } from './rules/URLRule'

export class URLValidator extends AbstractValidator {
    public constructor(options: AbstractValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid url',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = URLRule(chain)
        return chain.withMessage(this.error)
    }
}
