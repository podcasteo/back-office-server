import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import find from 'modules/podcasts/services/find'
import client from 'modules/podcasts/client'
import podcastFixture from 'modules/podcasts/fixtures/podcast'

chai.use(sinonChai)

describe('(Podcasts) find ::', () => {
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
        podcastFixture,
      ],
    })

    return find()
      .then((result) => {
        sinon.assert.calledOnce(findStub)
        expect(result).to.have.all.keys('pageInfo', 'data')
      })
  })
})
