import supertest = require('supertest')

export async function ValidatorNumberTest(request: supertest.SuperTest<supertest.Test>) {
    const resMinMaxOptional: any = await request.post('/validator/number/min-max-optional').send({
        number: -1,
    })
    expect(resMinMaxOptional.status).toBe(400)

    const resZeroOptional: any = await request.post('/validator/number/min-max-zero').send({
        number: 0,
    })
    expect(resZeroOptional.status).toBe(200)
}
