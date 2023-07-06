import { ValidatorStructure } from './Validator'

/**
 * Frames objects in validators.
 */
export class VObject {
    public validator: ValidatorStructure
    public options: VArrayOptions

    constructor(validator: ValidatorStructure, options: VArrayOptions = {}) {
        this.validator = validator
        this.options = Object.assign(
            {
                required: true,
                error: 'Invalid object',
            },
            options
        )
    }
}

interface VArrayOptions {
    required?: boolean
    error?: string
}
