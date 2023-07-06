import supertest = require('supertest')

// Boolean - Simple
export async function BooleanSimpleTest(request: supertest.SuperTest<supertest.Test>) {
    // CORRECT
    const res: any = await request.post('/boolean/validator').send({
        checkMate: true,
    })
    expect(res.status).toBe(200)

    // CORRECT
    const res1: any = await request.post('/boolean/validator').send({
        checkMate: 'true',
    })
    expect(res1.status).toBe(200)

    // FAULTY
    const res2: any = await request.post('/boolean/validator').send({
        checkMate: 'Max',
    })
    expect(res2.status).toBe(400)
    expect(res2.body.errors[0].msg).toBe('Please send a boolean value.')
}
