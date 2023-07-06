import { ValidatorArray, ValidatorFunction, ValidatorObject, ValidatorValue } from './Validator'

/**
 * Frames arrays in validators.
 */
export class VArray {
    public validator: ValidatorValue | ValidatorObject | ValidatorArray | ValidatorFunction
    public options: VArrayOptions

    constructor(
        validator: ValidatorValue | ValidatorObject | ValidatorArray | ValidatorFunction,
        options: VArrayOptions = {}
    ) {
        this.validator = validator
        this.options = Object.assign(
            {
                required: true,
                error: 'Invalid array',
            },
            options
        )
    }
}

interface VArrayOptions {
    required?: boolean
    error?: string
    minLength?: number
    maxLength?: number
    separator?: string
}
