import $ from 'bucks-js'
import { ValidationChain } from 'express-validator'
import { AbstractValidator } from '../AbstractValidator'
import { VArray } from '../VArray'
import { VObject } from '../VObject'
import { ObjectValidator } from '../validators/ObjectValidator'
import { ArrayValidator } from '../validators/ArrayValidator'
import {
    RequestValidatorStructure,
    ValidatorArray,
    ValidatorFunction,
    ValidatorObject,
    ValidatorStructure,
    ValidatorValue,
} from '../Validator'

export default class ValidatorService {
    /**
     * Builds validation chain for validators and request.
     * @param request
     * @param validators
     * @param options
     */
    public static async buildRequestValidationChains(
        request: { [key: string]: any },
        validators: RequestValidatorStructure,
        options: { [key: string]: any }
    ): Promise<ValidationChain[]> {
        let validationChains: ValidationChain[] = []
        const locations: ('body' | 'query' | 'params' | 'headers')[] = ['body', 'query', 'params', 'headers']

        // creates validation chains for all request parts
        for (const location of locations) {
            // evaluates if request part should be filtered
            const filterKey: string = 'filter' + $.string.capitalize(location)
            const filterOption = options[filterKey]
            if ((validators[location] && !$.object.empty(validators[location])) || filterOption === true) {
                const bodyValidationChains = await this.buildObjectExecutors(
                    request[location],
                    validators[location],
                    location,
                    '',
                    filterOption
                )
                validationChains = validationChains.concat(bodyValidationChains)
            }
        }

        return validationChains
    }

    /**
     * Analyse one object layer with all properties of that object.
     * @param object
     * @param validators: {[key: string]: AbstractValidator|Varray}
     * @param location
     * @param path
     * @param filter
     */
    private static async buildObjectExecutors(
        object: any,
        validators: ValidatorStructure,
        location: 'body' | 'query' | 'params' | 'headers',
        path: string,
        filter: boolean
    ): Promise<ValidationChain[]> {
        let validationChains: ValidationChain[] = []

        if ($.object.is(validators)) {
            // add object validator
            validationChains.push(new ObjectValidator().validation(location, path))

            // get validation chain for each validator property
            for (const property of Object.keys(validators)) {
                const value = $.object.get(object, property) // value for current property path
                const propertyPath = path === '' ? property : path + '.' + property

                // add executors to local executor and handle special cases
                validationChains = await this.addToValidationChain(
                    validationChains,
                    value,
                    validators[property],
                    location,
                    propertyPath,
                    filter
                )
            }
        }

        // deletes unnecessary properties in local object that are not in validator properties
        this.filterKeys(object, validators, filter)

        return validationChains
    }

    /**
     * Analyses one array layer with all items.
     * @param array
     * @param vArray
     * @param location
     * @param path
     * @param filter
     */
    private static async buildArrayExecutors(
        array: any,
        vArray: VArray,
        location: 'body' | 'query' | 'params' | 'headers',
        path: string,
        filter: boolean
    ): Promise<ValidationChain[]> {
        let validationChains: ValidationChain[] = []
        const validator: any = vArray.validator

        // add array validator
        validationChains.push(new ArrayValidator(vArray.options).validation(location, path))

        // array items
        if ($.array.is(array)) {
            for (const [index, value] of array.entries()) {
                const indexPath = path + '[' + index + ']'
                validationChains = await this.addToValidationChain(
                    validationChains,
                    value,
                    validator,
                    location,
                    indexPath,
                    filter
                )
            }
        }

        return validationChains
    }

    /**
     * Add to validation chain.
     * @param validationChains
     * @param value
     * @param validator
     * @param location
     * @param path
     * @param filter
     */
    private static async addToValidationChain(
        validationChains: ValidationChain[],
        value: any,
        validator: ValidatorValue | ValidatorObject | ValidatorArray | ValidatorFunction,
        location: 'body' | 'query' | 'params' | 'headers',
        path: string,
        filter: boolean
    ) {
        if (validator instanceof Function) {
            const functionValidator = await validator(value)
            validationChains = await this.addToValidationChain(
                validationChains,
                value,
                functionValidator,
                location,
                path,
                filter
            )
        } else if (validator instanceof VArray) {
            // special case if validator is array validator - array
            const arrayExecutors = await this.buildArrayExecutors(value, validator, location, path, filter)
            validationChains = validationChains.concat(arrayExecutors)
        } else if (validator instanceof VObject) {
            // special case if validator is object validator - object
            if ($.object.is(value) || validator.options.required === true) {
                const objectExecutors = await this.buildObjectExecutors(
                    value,
                    validator.validator,
                    location,
                    path,
                    filter
                )
                validationChains = validationChains.concat(objectExecutors)
            }
        } else if (validator instanceof AbstractValidator) {
            // single validator
            validationChains.push(validator.validation(location, path))
        } else if ($.array.is(validator)) {
            // multiple validators on one key
            for (const v of validator) {
                validationChains = await this.addToValidationChain(validationChains, value, v, location, path, filter)
            }
        } else {
            // object validator
            const objectExecutors = await this.buildObjectExecutors(value, validator, location, path, filter)
            validationChains = validationChains.concat(objectExecutors)
        }
        return validationChains
    }

    /**
     * Filters unnecessary properties in local object that are not in validator properties.
     * @param object
     * @param validators
     * @param filter
     */
    private static filterKeys(object: any, validators: any, filter: boolean) {
        if (filter && $.object.is(object)) {
            const validatorProperties = $.object.is(validators) ? Object.keys(validators) : []
            const unnecessaryProperties = Object.keys(object).filter((p) => {
                return validatorProperties.indexOf(p) === -1
            })
            for (const property of unnecessaryProperties) {
                delete object[property as keyof object]
            }
        }
    }
}
