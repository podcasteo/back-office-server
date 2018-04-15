import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import deleteUser from 'modules/users/services/deleteUser'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(User) deleteUser ::', () => {
  let localSandbox
  let deleteStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    deleteStub = localSandbox.stub(client, 'deleteUser')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(deleteUser).to.be.a('function')
  })

  it('should delete user', () => {
    deleteStub.resolves(userFixture)

    return deleteUser(userFixture.id)
      .then((result) => {
        sinon.assert.calledOnce(deleteStub)
        expect(result).to.be.equal(userFixture)
      })
  })
})
