import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import login from 'modules/users/services/login'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'
import loginFixture from 'modules/users/fixtures/login'

chai.use(sinonChai)

describe('(User) login ::', () => {
  let localSandbox
  let findByEmailStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findByEmailStub = localSandbox.stub(client, 'findByEmail')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(login).to.be.a('function')
  })

  it('should login a user', () => {
    findByEmailStub.resolves(userFixture)

    return login(loginFixture)
      .then((result) => {
        sinon.assert.calledOnce(findByEmailStub)
        expect(result.token).to.be.a('String')
      })
  })

  it('should throw if user not found', () => {
    findByEmailStub.resolves(null)

    return login(loginFixture)
      .catch((error) => {
        sinon.assert.calledOnce(findByEmailStub)
        expect(error).to.be.an('error')
      })
  })

  it('should throw if password invalid', () => {
    findByEmailStub.resolves(userFixture)

    return login({
      email: 'vincent.kocupyr@gmail.com',
      password: 'fauxpassword',
    })
      .catch((error) => {
        sinon.assert.calledOnce(findByEmailStub)
        expect(error).to.be.an('error')
      })
  })
})
