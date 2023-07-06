import supertest = require('supertest')

export async function ValidatorStringTest(request: supertest.SuperTest<supertest.Test>) {
    const basis: any = await request.post('/validator/string').send({
        firstName: 'Test',
    })
    expect(basis.status).toBe(200)
}
