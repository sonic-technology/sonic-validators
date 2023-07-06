import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { ValuesPoolRule } from './rules/ValuesPoolRule'
import { MinMaxNumberRule } from './rules/MinMaxNumberRule'
import $ from 'bucks-js'

export class NumberValidator extends AbstractValidator {
    public constructor(options: NumberValidatorOptions = {}) {
        options = Object.assign(
            {
                type: options.type ? options.type : 'integer',
                error: 'Invalid number',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        if (this.options.stringPartToDelete) {
            chain = chain.customSanitizer((value) => {
                return $.string.is(value) ? value.replace(this.options.stringPartToDelete, '') : value
            })
        }
        if (this.options.type === 'integer') {
            chain = chain.isInt().withMessage(this.error).bail().toInt()
        } else {
            chain = chain.isDecimal().withMessage(this.error).bail().toFloat()
        }
        chain = MinMaxNumberRule(chain, this.options.minNumber, this.options.maxNumber).withMessage(this.error).bail()
        chain = ValuesPoolRule(chain, this.options.valuesPool).withMessage(this.error).bail()
        return chain
    }
}

interface NumberValidatorOptions extends AbstractValidatorOptions {
    type?: 'integer' | 'decimal'
    minNumber?: number
    maxNumber?: number
    valuesPool?: number[]
    stringPartToDelete?: string // deletes a string part from value if value is a string -> example $ or €
}
