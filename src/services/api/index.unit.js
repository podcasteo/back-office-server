import {
  expect,
} from 'chai'

import api from 'services/api'

describe('> index', () => {
  it('should export a function', () => {
    expect(api).to.be.a('function')
  })
})
