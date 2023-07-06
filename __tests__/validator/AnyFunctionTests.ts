import supertest = require('supertest')
import {
    NumberValidator,
    StringValidator,
    ValidatorAnyFunction,
    ValidatorRequestFunction,
    VArray,
    VObject,
} from '../../src'

// Any Function
export async function AnyFunctionTest(request: supertest.SuperTest<supertest.Test>) {
    const arrayData = [
        { firstName: 'Max', lastName: 'Mustermann' },
        { firstName: 'Pater', lastName: 'Meier', age: 20 },
        { firstName: 'Lea', age: 30 },
    ]
    const objectData = { firstName: 'Max', lastName: 'Mustermann' }

    const result: any = await ValidatorAnyFunction(
        arrayData,
        new VArray({
            firstName: new StringValidator(),
            lastName: new StringValidator(),
            age: new NumberValidator(),
        })
    )
    console.log(result)

    const result1: any = await ValidatorAnyFunction(objectData, {
        firstName: new StringValidator(),
        lastName: new StringValidator(),
        age: new NumberValidator(),
    })
    console.log(result1)
}
