import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { LengthRule } from './rules/LengthRule'
import { ValuesPoolRule } from './rules/ValuesPoolRule'

export class StringValidator extends AbstractValidator {
    public constructor(options: StringValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid string',
                trim: true,
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path) // call parent class function to do basic processing
        chain = chain.isString().withMessage(this.error).bail() // do string related processing
        chain = this.options.trim === true ? chain.trim() : chain // cut off spaces at the beginning and end of string
        chain = LengthRule(chain, this.options.minLength, this.options.maxLength).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, true, this.options.allowedValues).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, false, this.options.notAllowedValues).withMessage(this.error).bail()
        return chain.withMessage(this.error)
    }
}

export interface StringValidatorOptions extends AbstractValidatorOptions {
    trim?: boolean
    minLength?: number
    maxLength?: number
    allowedValues?: string[] // possible values that the value can have
    notAllowedValues?: string[] // possible values that the value can have
}
