import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import updateUser from 'modules/users/services/updateUser'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'
import updateUserFixture from 'modules/users/fixtures/updateUser'

chai.use(sinonChai)

describe('(User) updateUser ::', () => {
  let localSandbox
  let updateStub
  let findOneStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    updateStub = localSandbox.stub(client, 'updateUser')
    findOneStub = localSandbox.stub(client, 'findById')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(updateUser).to.be.a('function')
  })

  it('should update user', () => {
    updateStub.resolves(updateUserFixture)
    findOneStub.resolves(userFixture)

    return updateUser(userFixture.id, {
      email: 'vincent.toto@gmail.com',
    })
      .then((result) => {
        sinon.assert.calledOnce(updateStub)
        sinon.assert.calledOnce(findOneStub)
        expect(result).to.be.equal(updateUserFixture)
      })
  })
})
