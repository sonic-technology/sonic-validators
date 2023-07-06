import { ValidationChain } from 'express-validator'
import { AbstractValidator, AbstractValidatorOptions } from '../AbstractValidator'
import { DateTimeRule } from './rules/DateTimeRule'
import { DateTime } from 'luxon'

export class DateTimeValidator extends AbstractValidator {
    public constructor(options: DateTimeValidatorOptions = {}) {
        options = Object.assign(
            {
                error: 'Invalid datetime',
                toJSDate: false,
            },
            options
        )
        super(options)
    }

    public validation(location: 'body' | 'query' | 'params' | 'headers', path: string): ValidationChain {
        let chain = this.validationChain(location, path)

        // check if date can be a valid js date
        chain = chain.custom(async (value) => {
            const date = new Date(value)
            if (date.toString() === 'Invalid Date') {
                throw Error(this.options.error)
            } else {
                return true
            }
        })

        // check if date is in specific format
        if (this.options.format) {
            chain = DateTimeRule(chain, this.options.format)
        }

        chain = chain.withMessage(this.error).bail()

        // value to js date sanitizer
        if (this.options.toJSDate === true) {
            chain = chain.customSanitizer((value) => {
                const requestDate = new Date(value)
                const userTimezoneOffset = requestDate.getTimezoneOffset() * 60000
                return new Date(requestDate.getTime() - userTimezoneOffset)
            })
        }

        // value to utc js date sanitizer
        if (this.options.toUTCJSDate === true) {
            chain = chain.customSanitizer((value) => {
                return DateTime.fromISO(value, { setZone: true }).setZone('UTC').toJSDate()
            })
        }

        return chain
    }
}

interface DateTimeValidatorOptions extends AbstractValidatorOptions {
    format?: string
    toJSDate?: boolean
    toUTCJSDate?: boolean
}
