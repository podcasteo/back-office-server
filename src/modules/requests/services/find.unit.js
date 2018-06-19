import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import find from 'modules/requests/services/find'
import client from 'modules/requests/client'
import requestFixture from 'modules/requests/fixtures/request'

chai.use(sinonChai)

describe('(Requests) find ::', () => {
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
      data: [
        requestFixture,
      ],
    })

    return find()
      .then((result) => {
        sinon.assert.calledOnce(findStub)
        expect(result).to.have.all.keys('pageInfo', 'data')
      })
  })
})
