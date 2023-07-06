import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import $ from 'bucks-js'

export class ArrayValidator extends AbstractValidator {
    public constructor(options: ArrayValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid array',
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)
        // string to array sanitizer if separator is set
        if (this.options.separator) {
            chain = chain.customSanitizer((value) => {
                return $.string.is(value) ? value.split(this.options.separator) : value
            })
        }
        // check if array
        chain = chain.isArray({
            ...(this.options.minLength && { min: this.options.minLength }), // undefined as minLength value fails therefore this solution
            ...(this.options.maxLength && { max: this.options.maxLength }), // undefined as maxLength value fails therefore this solution
        })
        return chain.withMessage(this.error)
    }
}

interface ArrayValidatorOptions extends AbstractValidatorOptions {
    separator?: string // if value is string, it will be split by this separator
    minLength?: number
    maxLength?: number
}
