import { ValidationChain, validationResult } from 'express-validator'
import ValidatorService from './services/ValidatorService'
import { VArray } from './VArray'
import { ValidatorStructure } from './Validator'

/**
 * Validates any value.
 * @param value
 * @param validators
 * @param filter
 */
export const ValidatorAnyFunction = async (
    value: { [key: string]: any } | any[],
    validators: ValidatorStructure | VArray,
    filter = false
) => {
    const arrayCheck = validators instanceof VArray
    if (arrayCheck) {
        value = { body: { array: value } }
        validators = { body: { array: validators } }
    } else {
        value = { body: value }
        validators = { body: validators }
    }

    const validationChains: ValidationChain[] = await ValidatorService.buildRequestValidationChains(
        value,
        validators as ValidatorStructure,
        { filterBody: filter }
    )

    // validate chains result and responds with error if necessary
    await Promise.all(validationChains.map((validator) => validator.run(value)))
    const errors = validationResult(value)
    if (!errors.isEmpty()) {
        // format errors if array
        const errorsArray = errors.array()
        return errorsArray.map((error) => {
            return {
                value: error.value,
                msg: error.msg,
                param: arrayCheck ? error.param.slice(5) : error.param,
            }
        })
    } else {
        return undefined
    }
}
