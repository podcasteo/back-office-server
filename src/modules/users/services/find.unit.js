import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import find from 'modules/users/services/find'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(User) find ::', () => {
  let localSandbox
  let findStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findStub = localSandbox.stub(client, 'find')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(find).to.be.a('function')
  })

  it('should find user', () => {
    findStub.resolves({
      totalCount: 1,
      data:
      [
        userFixture,
      ],
    })

    return find()
      .then((result) => {
        sinon.assert.calledOnce(findStub)
        expect(result).to.have.all.keys('pageInfo', 'data')
      })
  })
})
