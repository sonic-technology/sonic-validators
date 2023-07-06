import dotenv from 'dotenv'
dotenv.config()
import { dataSource } from '../app/dataSource'
import {
    AdminAuthenticationEmailPasswordTest,
    AuthenticationEmailPasswordTest,
} from './authentication/EmailPasswordSignInTests'
import { AuthenticationGoogleTest } from './authentication/GoogleSignInTests'
import { ValidatorMultipleTest } from './validator/MultipleTests'
import { AuthenticationEmailTotpTest } from './authentication/EmailTotpSignInTests'
import { InvitationTest } from './authentication/InvitationTests'
import { ValidatorNumberTest } from './validator/NumberTests'
import { TotpService } from '../src/authentication/services/TotpService'
import { AnyFunctionTest } from './validator/AnyFunctionTests'
import { ValidatorStringTest } from './validator/StringTests'

// start server app & database connection
beforeAll(async () => {
    console.log('Opening connection to DB')
    await dataSource.initialize()
    console.log('Connection to DB established')
})
const app = require('../app/server.ts').default
const server = app.listen(3005)
const supertest = require('supertest')
const request = supertest(app)

// authentication
test('Authentication - Email & Password', async () => await AuthenticationEmailPasswordTest(request))
test('Authentication - Admin - Email & Password', async () => await AdminAuthenticationEmailPasswordTest(request))
// test('Authentication - Email & TOTP', async () => await AuthenticationEmailTotpTest(request))
// test('Authentication - Google', async () => await AuthenticationGoogleTest(request))
test('Authentication - Invitation Test', async () => await InvitationTest(request))

// validator
test('Validator - Multiple Validator', async () => await ValidatorMultipleTest(request))
test('Validator - Number Validator', async () => await ValidatorNumberTest(request))
test('Validator - Any Function', async () => await AnyFunctionTest(request))
test('Validator - String Validator', async () => {
    await ValidatorStringTest(request)
})

// stop server
afterAll(async () => {
    server.close()
})
