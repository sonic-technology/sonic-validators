import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { UUIDRule } from './rules/UUIDRule'
import { ValuesPoolRule } from './rules/ValuesPoolRule'

export class UuidValidator extends AbstractValidator {
    public constructor(options: UUIDValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid uuid',
                version: 4,
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = UUIDRule(chain, this.options.version).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, true, this.options.allowedValues).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, false, this.options.notAllowedValues).withMessage(this.error).bail()
        return chain.withMessage(this.error)
    }
}

interface UUIDValidatorOptions extends AbstractValidatorOptions {
    version?: number
    allowedValues?: string[] // possible values that the value can have
    notAllowedValues?: string[] // possible values that the value can have
}
