import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'

export class AnyValidator extends AbstractValidator {
    public constructor(options: AbstractValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid value',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        const chain = this.validationChain(location, path)
        return chain
            .custom((value) => {
                return true
            })
            .withMessage(this.error)
    }
}
