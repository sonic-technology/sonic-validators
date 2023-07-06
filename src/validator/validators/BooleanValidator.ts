import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { BooleanValueRule } from './rules/BooleanValueRule'

export class BooleanValidator extends AbstractValidator {
    public constructor(options: BooleanValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid value',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = chain.isBoolean().withMessage(this.error).bail()
        chain = BooleanValueRule(chain, this.options.requiredValue)
        return chain.toBoolean().withMessage(this.error)
    }
}

export interface BooleanValidatorOptions extends AbstractValidatorOptions {
    requiredValue?: boolean
}
