import { Request, Response, NextFunction } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import ValidatorService from './services/ValidatorService'
import { AbstractValidator } from './AbstractValidator'
import { VArray } from './VArray'
import { VObject } from './VObject'

export type ValidatorValue = AbstractValidator | VArray | VObject
export type ValidatorObject = { [key: string]: ValidatorValue | ValidatorObject | ValidatorArray | ValidatorFunction }
export type ValidatorArray = ValidatorValue[]
export type ValidatorFunction = (
    value: any
) => ValidatorValue | ValidatorObject | ValidatorArray | Promise<ValidatorValue | ValidatorObject | ValidatorArray>

export interface ValidatorStructure {
    [key: string]: ValidatorValue | ValidatorObject | ValidatorArray | ValidatorFunction | ValidatorStructure
}
export type RequestValidatorStructure = {
    body?: ValidatorStructure
    query?: ValidatorStructure
    params?: ValidatorStructure
    headers?: ValidatorStructure
}

/**
 * Validates entire request.
 * @param validators
 * @param options
 */
export const Validator =
    (validators: RequestValidatorStructure, options: ValidatorOptions = {}) =>
    async (req: Request, res: Response, next: NextFunction) => {
        options = Object.assign(
            {
                filterBody: true,
                filterQuery: false,
                filterParams: false,
                filterHeaders: false,
                validationResponse: true,
            },
            options
        )

        const validationChains: ValidationChain[] = await ValidatorService.buildRequestValidationChains(
            req,
            validators,
            options
        )

        // validates chain result and responds with error if necessary
        await Promise.all(validationChains.map((validator) => validator.run(req)))
        if (options.validationResponse) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
        }

        next()
    }

/**
 * Validator options interface.
 */
export interface ValidatorOptions {
    filterBody?: boolean
    filterQuery?: boolean
    filterParams?: boolean
    filterHeaders?: boolean
    validationResponse?: boolean
}
