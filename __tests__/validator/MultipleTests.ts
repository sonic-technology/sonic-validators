import supertest from 'supertest'

export async function ValidatorMultipleTest(request: supertest.SuperTest<supertest.Test>) {
    // CORRECT
    const res: any = await request.post('/validator/multiple/simple').send({
        firstName: 'Maximilian',
    })
    expect(res.status).toBe(200)

    // FAULTY
    const res1: any = await request.post('/validator/multiple/simple').send({
        firstName: 'Max',
    })
    expect(res1.status).toBe(400)
    expect(res1.body.errors[0].msg).toBe('Please enter a valid First Name with min length 10.')

    // FAULTY
    const res2: any = await request.post('/validator/multiple/simple').send({
        firstName: 'M',
    })
    expect(res2.status).toBe(400)
    expect(res2.body.errors.length).toBe(2)
}
