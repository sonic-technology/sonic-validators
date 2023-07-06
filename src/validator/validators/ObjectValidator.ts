import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { ObjectRule } from './rules/ObjectRule'

export class ObjectValidator extends AbstractValidator {
    public constructor(options: AbstractValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid object',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = ObjectRule(chain)
        return chain.withMessage(this.error)
    }
}
