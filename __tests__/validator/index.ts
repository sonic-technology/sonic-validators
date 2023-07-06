/*import { FunctionArrayTest, FunctionObjectTest } from './categories/FunctionTests'
import { ArraySimpleTest } from './categories/ArrayTests'
import { BooleanSimpleTest } from './categories/BooleanTests'


const app = require('../app/server.ts').default
app.listen(3000)
const supertest = require('supertest')
const request = supertest(app)


// STRING
// correct
test('String Validator: Correct', async () => {
    const res = await request.post('/string-validator').send({ firstName: 'Max' })
    expect(res.status).toBe(200) // status code
})

test('String Validator Not Required: Correct', async () => {
    const res = await request.post('/string-validator-not-required').send({ firstName: null })
    expect(res.status).toBe(200) // status code
})

// faulty: empty string
test('String Validator: Faulty', async () => {
    const res = await request.post('/string-validator').send()
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('firstName') // error param
    expect(res.body.errors[0].msg).toBe('Please enter your First Name.') // error message
})

// correct: appropriate length
test('String Validator: Correct', async () => {
    const res = await request.post('/string-validator-min-max').send({ password: '123456' })
    expect(res.status).toBe(200) // status code
})

// faulty: too short < 5
test('String Validator: Faulty', async () => {
    const res = await request.post('/string-validator-min-max').send({ password: '1234' })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('password') // error param
    expect(res.body.errors[0].msg).toBe('Password too short/too long.') // error message
})

// faulty: too long > 10
test('String Validator: Faulty', async () => {
    const res = await request.post('/string-validator-min-max').send({ password: '12345678910' })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('password') // error param
    expect(res.body.errors[0].msg).toBe('Password too short/too long.') // error message
})

test('String Validator: Correct Values', async () => {
    const res = await request.post('/string-validator-values').send({ device: 'iPhone' })
    expect(res.status).toBe(200) // status code
})

test('String Validator: Faulty Values', async () => {
    const res = await request.post('/string-validator-values').send({ device: 'iPad' })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('device') // error param
    expect(res.body.errors[0].msg).toBe('Device is not in devices list.') // error message
})

test('String Validator: Correct Optional Values', async () => {
    const res = await request.post('/string-validator-values-optional').send({ answer: 'Yes' })
    expect(res.status).toBe(200) // status code
})



// NUMBER
// correct
test('Number (Integer) Validator: Correct', async () => {
    const res = await request.post('/number-validator').send({ number: +444 }) // plus at the beginning is allowed
    expect(res.status).toBe(200) // status code
    const res1 = await request.post('/number-validator').send({ number: '444' })
    expect(res1.status).toBe(200) // status code
})

// faulty
test('Number (Integer) Validator: Faulty', async () => {
    const res = await request.post('/number-validator').send({ number: true })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('number') // error param
    expect(res.body.errors[0].msg).toBe('Please enter a Number.') // error message
})

// correct
test('Number (Integer) Validator: Correct - Min Max', async () => {
    const res1 = await request.post('/number-validator-min-max').send({ number: 10 })
    expect(res1.status).toBe(200) // status code
    const res2 = await request.post('/number-validator-min-max').send({ number: '10' })
    expect(res2.status).toBe(200) // status code
})

// faulty: too small
test('Number (Integer) Validator: Faulty - Min', async () => {
    const res = await request.post('/number-validator-min-max').send({ number: '9' })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('number') // error param
    expect(res.body.errors[0].msg).toBe('Please enter a number in range [10, 100].') // error message
})

// faulty: too large
test('Number (Integer) Validator: Faulty - Max', async () => {
    const res = await request.post('/number-validator-min-max').send({ number: 1001 })
    expect(res.status).toBe(400) // status code
    expect(res.body.errors[0].param).toBe('number') // error param
    expect(res.body.errors[0].msg).toBe('Please enter a number in range [10, 100].') // error message
})

test('Number (Decimal) Validator: Correct - Min Max', async () => {
    const res1 = await request.post('/number-decimal-validator-min-max').send({ number: 55 })
    expect(res1.status).toBe(200) // status code
    const res2 = await request.post('/number-decimal-validator-min-max').send({ number: 5.6 })
    expect(res2.status).toBe(200) // status code
    const res3 = await request.post('/number-decimal-validator-min-max').send({ number: 99 })
    expect(res3.status).toBe(200) // status code
    const res4 = await request.post('/number-decimal-validator-min-max').send({ number: '99' })
    expect(res4.status).toBe(200) // status code
})

test('Number (Decimal) Validator: Faulty - Min Max', async () => {
    const res1 = await request.post('/number-decimal-validator-min-max').send({ number: 5.4 })
    expect(res1.status).toBe(400) // status code
    const res2 = await request.post('/number-decimal-validator-min-max').send({ number: 101.1 })
    expect(res2.status).toBe(400) // status code
    const res3 = await request.post('/number-decimal-validator-min-max').send({ number: 0.9 })
    expect(res3.status).toBe(400) // status code
})



// EMAIL
// email correct
test('Email Validator: Correct', async () => {
    const res = await request.post('/email-validator').send({ email: 'humphrey@bogart.com' })
    expect(res.status).toBe(200)
})

// faulty: email host domain invalid
test('Email Validator: Faulty', async () => {
    const res = await request.post('/email-validator').send({ email: 'humphrey@bogart' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('email') // error param
    expect(res.body.errors[0].msg).toBe('Invalid email') // error message
})

// faulty: no '@' sign
test('Email Validator: Faulty', async () => {
    const res = await request.post('/email-validator').send({ email: 'humphreybogart.com' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('email') // error param
    expect(res.body.errors[0].msg).toBe('Invalid email') // error message
})

// faulty key name
test('Email Validator: Faulty', async () => {
    const res = await request.post('/email-validator').send({ forgotMyParam: 'humphrey@bogart.com' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('email') // error param
    expect(res.body.errors[0].msg).toBe('Invalid email') // error message
})



// DATETIME - Expected format: YYYY-MM-DDTHH:mm:ssZ
// correct
test('Datetime Validator: Correct', async () => {
    const res = await request.post('/datetime-validator').send({ datetime: '1914-07-28T12:32:59Z' })
    expect(res.status).toBe(200)
})

// faulty order: DD-MM-YYYY
test('Datetime Validator: Faulty', async () => {
    const res = await request.post('/datetime-validator').send({ datetime: '28-07-1914T12:32:59Z' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('datetime') // error param
    expect(res.body.errors[0].msg).toBe('Invalid datetime') // error message
})

// faulty time value: 61 minutes
test('Datetime Validator: Faulty', async () => {
    const res = await request.post('/datetime-validator').send({ datetime: '28-07-1914T12:61:59Z' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('datetime') // error param
    expect(res.body.errors[0].msg).toBe('Invalid datetime') // error message
})

// faulty format: missing 'Z' at end
test('Datetime Validator: Faulty', async () => {
    const res = await request.post('/datetime-validator').send({ datetime: '28-07-1914T12:32:59' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('datetime') // error param
    expect(res.body.errors[0].msg).toBe('Invalid datetime') // error message
})

// correct test format casting
test('Datetime Validator: Cast', async () => {
    const res = await request.post('/datetime-validator-cast').send({ datetime: '1914-07-28 12:32:59' })
    expect(res.status).toBe(200)
    expect(res.body.type).toBe('object')
})

test('Datetime Validator: Correct Without Format', async () => {
    const res = await request.post('/datetime-validator-without-format').send({ datetime: '1914-07-28T12:32:59Z' })
    expect(res.status).toBe(200)
})

test('Datetime Validator: Faulty Without Format', async () => {
    const res = await request.post('/datetime-validator-without-format').send({ datetime: 'aa' })
    expect(res.status).toBe(400)
})



// OBJECT
// correct
test('Object Validator: Correct', async () => {
    const res = await request.post('/object-validator').send({ object: { a: 'a simple', b: 'old', c: 'object' } })
    expect(res.status).toBe(200)
})

// correct
test('Object Validator: Correct', async () => {
    const res = await request.post('/object-validator').send({ object: { a: [1, 2, 3], b: 'quid est veritas' } })
    expect(res.status).toBe(200)
})

// faulty
test('Object Validator: Faulty', async () => {
    const res = await request.post('/object-validator').send('This is probably not an object...')
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('object') // error param
    expect(res.body.errors[0].msg).toBe('Invalid object') // error message
})



// PHONE
// correct
test('Phone Validator: Correct', async () => {
    const res = await request.post('/phone-validator').send({ phone: '+1 404-261-1441' })
    expect(res.status).toBe(200)
})

// faulty
test('Phone Validator: Faulty', async () => {
    const res = await request.post('/phone-validator').send({ phone: '000fadshf0000' })
    expect(res.status).toBe(400)    // 400 := bad request
    expect(res.body.errors[0].param).toBe('phone') // error param
    expect(res.body.errors[0].msg).toBe('Invalid phone number') // error message
})



// URL
// correct
test('URL Validator: Correct', async () => {
    const res = await request.post('/url-validator').send({ url: 'https://www.nytimes.com/subscribe' })
    expect(res.status).toBe(200)
})

test('URL Validator: Correct', async () => {
    const res = await request.post('/url-validator').send({ url: 'ftp://www.nytimes.com/subscribe?key=value' })
    expect(res.status).toBe(200)
})

// faulty: bad hostname, using reserved character '?'
test('URL Validator: Faulty', async () => {
    const res = await request.post('/url-validator').send({ url: 'https://www.n?ytimes.com' })
    expect(res.status).toBe(400)
    expect(res.body.errors[0].param).toBe('url')
    expect(res.body.errors[0].msg).toBe('Invalid url')
})

// faulty: unsafe character '<'
test('URL Validator: Faulty', async () => {
    const res = await request.post('/url-validator').send({ url: 'https://www.nytimes.com/<3' })
    expect(res.status).toBe(400)
    expect(res.body.errors[0].param).toBe('url')
    expect(res.body.errors[0].msg).toBe('Invalid url')
})



// REGEX
test('RegEx Validator: Correct', async () => {
    const res = await request.post('/regex-validator').send({ regex: '-21.231' })
    expect(res.status).toBe(200)
})

test('RegEx Validator: Correct', async () => {
    const res = await request.post('/regex-validator').send({ regex: 'You owe me $3.' })
    expect(res.status).toBe(200)
})

// faulty: not decimal value
test('RegEx Validator: Faulty', async () => {
    const res = await request.post('/regex-validator').send({ regex: 'Carthago delenda est' })
    expect(res.status).toBe(400)
    expect(res.body.errors[0].param).toBe('regex')
    expect(res.body.errors[0].msg).toBe('No match found')
})



// ARRAY
test('Array Validator: Faulty', async () => {
    const res = await request.post('/array-validator').send({
        friends: [
            {
                firstName: 'Max',
                lastName: 'Mustermann',
                email: 'max@mustermann.de',
            },
            {
                firstName: 'Linus',
                lastName: 'Meier',
            },
        ]
    })
    expect(res.status).toBe(400)
    expect(res.body.errors[0].param).toBe('friends[1].email')
})

test('Array Validator: Correct with Body Filter', async () => {
    const res = await request.post('/array-validator').send({
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
        ]
    })
    expect(res.status).toBe(200)
    expect(res.body.data.friends[1].birthdate).toBe(undefined)
})

test('Array Validator: Correct with Body Filter on Function', async () => {
    const res = await request.post('/array-validator-function').send({
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
        ]
    })
    expect(res.status).toBe(200)
    expect(res.body.data.friends[1].birthdate).toBe(undefined)
})

test('Array Validator: Faulty Function', async () => {
    const res = await request.post('/array-validator-function').send({
        friends: [
            {
                firstName: 'Max',
                lastName: 'Mustermann',
                email: 'max@mustermann.de',
            },
            {
                firstName: 'Linus',
                lastName: 'Meier',
            },
        ]
    })
    expect(res.status).toBe(400)
    expect(res.body.errors[0].param).toBe('friends[1].email')
})



// QUERY
test('Query Validator: Email', async () => {
    const res = await request.get('/query-validator?email=hans@hans').send()
    expect(res.status).toBe(400)
    expect(res.body.errors[0].msg).toBe('Invalid email')
})



// PARAMS
test('Param Validator: Correct Uuid with Query Filter', async () => {
    const res = await request.get('/uuid/dd15731c-28b5-4a25-87f3-da49a585668b?email=seb@maier.de').send()
    expect(res.status).toBe(200)
    expect(res.body.errors).toBe(undefined)
    expect(res.body.data.email).toBe(undefined)
})

test('Param Validator: Faulty Uuid', async () => {
    const res = await request.get('/uuid/dd731c-28b5-4a25-87f3-da49a585668b').send()
    expect(res.status).toBe(400)
    expect(res.body.errors[0].msg).toBe('Invalid uuid')
})


// FUNCTION
test('Function - Object', () => FunctionObjectTest(request))
test('Function - Array', () => FunctionArrayTest(request))

// ARRAY
test('Array - Simple', () => ArraySimpleTest(request))

// BOOLEAN
test('Boolean - Simple', () => BooleanSimpleTest(request))*/
