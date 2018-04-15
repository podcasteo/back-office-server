import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import findOne from 'modules/users/services/findOne'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(User) findOne ::', () => {
  let localSandbox
  let findOneStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findOneStub = localSandbox.stub(client, 'findById')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(findOne).to.be.a('function')
  })

  it('should find one user', () => {
    findOneStub.resolves(userFixture)

    return findOne(userFixture.id)
      .then((result) => {
        sinon.assert.calledOnce(findOneStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('throw if user not found', () => {
    findOneStub.resolves(null)

    return findOne(userFixture.id)
      .catch((error) => {
        sinon.assert.calledOnce(findOneStub)
        expect(error).to.be.an('error')
      })
  })
})
