import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { RegexRule } from './rules/RegexRule'
import { ValuesPoolRule } from './rules/ValuesPoolRule'

export class RegexValidator extends AbstractValidator {
    public constructor(options: RegexValidatorOptions) {
        options = Object.assign(
            {
                error: 'No match found',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        chain = RegexRule(chain, this.options.regex).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, true, this.options.allowedValues).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, false, this.options.notAllowedValues).withMessage(this.error).bail()
        return chain.withMessage(this.error)
    }
}

export interface RegexValidatorOptions extends AbstractValidatorOptions {
    regex: RegExp
    allowedValues?: string[] // possible values that the value can have
    notAllowedValues?: string[] // possible values that the value can have
}
