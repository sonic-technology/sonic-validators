import supertest = require('supertest')

// Function - Object
export async function FunctionObjectTest(request: supertest.SuperTest<supertest.Test>) {
    // CORRECT
    const res: any = await request.post('/function/object-validator').send({
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max@mustermann.de',
    })
    expect(res.status).toBe(200)
    expect(res.body.data.birthdate).toBe(undefined)

    // FAULTY
    const res1: any = await request.post('/function/object-validator').send({
        firstName: 'Max',
        lastName: 'Mustermann',
    })
    expect(res1.status).toBe(400)
}

// Function - Array
export async function FunctionArrayTest(request: supertest.SuperTest<supertest.Test>) {
    // CORRECT
    const res: any = await request.post('/function/array-validator').send({
        friends: [
            {
                firstName: 'Max',
                lastName: 'Mustermann',
                email: 'max@mustermann.de',
            },
            {
                firstName: 'Linus',
                lastName: 'Meier',
                email: 'linus@meier.de',
                birthdate: '09/02/1990',
            },
        ],
    })
    expect(res.status).toBe(200)
    expect(res.body.data.friends[1].birthdate).toBe(undefined)
}
