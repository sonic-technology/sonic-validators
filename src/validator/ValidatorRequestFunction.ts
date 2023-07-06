import { ValidationChain, validationResult } from 'express-validator'
import ValidatorService from './services/ValidatorService'
import { RequestValidatorStructure } from './Validator'

/**
 * Validates entire request.
 * @param request
 * @param validators
 * @param options
 */
export const ValidatorRequestFunction = async (
    request: { [key: string]: any },
    validators: RequestValidatorStructure,
    options: ValidatorRequestFunctionOptions = {}
) => {
    options = Object.assign(
        {
            filterBody: false,
            filterQuery: false,
            filterParams: false,
            filterHeaders: false,
        },
        options
    )

    const validationChains: ValidationChain[] = await ValidatorService.buildRequestValidationChains(
        request,
        validators,
        options
    )

    // validate chains result and responds with error if necessary
    await Promise.all(validationChains.map((validator) => validator.run(request)))
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return errors.array()
    } else {
        return undefined
    }
}

/**
 * Validator request function options interface.
 */
interface ValidatorRequestFunctionOptions {
    filterBody?: boolean
    filterQuery?: boolean
    filterParams?: boolean
    filterHeaders?: boolean
}
