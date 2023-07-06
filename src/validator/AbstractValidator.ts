import { ValidationChain, body, query, param, header } from 'express-validator'
import { OptionalFieldRule } from './validators/rules/OptionalFieldRule'

export abstract class AbstractValidator {
    protected options: any
    protected error: string

    protected constructor(options: AbstractValidatorOptions) {
        this.options = Object.assign(
            {
                required: true,
                optionalValues: [null, ''],
                optionalReplaceValue: undefined,
                defaultValue: undefined,
            },
            options
        )
        this.error = options.error ?? 'Invalid value'
    }

    /**
     * This is the base case for a validation chain.
     * Can (& should) be extended in inheriting classes
     *  thru getValidationChain().
     *  @param location
     *  @param path
     */
    protected validationChain(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = null

        if (location === 'body') {
            chain = body(path)
        } else if (location === 'query') {
            chain = query(path)
        } else if (location === 'params') {
            chain = param(path)
        } else if (location === 'headers') {
            chain = header(path)
        }

        chain = OptionalFieldRule(
            chain,
            this.options.required,
            this.options.optionalValues,
            this.options.optionalReplaceValue
        )

        if (this.options.defaultValue) {
            chain = chain.default(this.options.defaultValue)
        }

        return chain
    }

    /**
     * All Validators extending this abstract class need to implement this method
     * example: return this.getBaseValidationChain()
     * @param location
     * @param path
     * @return ValidationChain
     */
    public abstract validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain
}

export interface AbstractValidatorOptions {
    error?: string // custom error message
    required?: boolean // optional field rule
    optionalValues?: any[] // values that are accepted as optional
    optionalReplaceValue?: undefined | null // value that will replace optional values
    defaultValue?: undefined
}
