// import client from 'modules/requests/client'
import Debug from 'debug'

import services from 'modules/requests/services'

const debug = Debug('podcasteo:bo:server:modules:requests:services:handleRequest')

export default async function handleRequest(id, data) {
  // verify id - data - user
  const request = await services.findOne(id)

  // do things according to the data object and request data
  debug('handleRequest-request', request)
  debug('handleRequest-data', data)

  return {
    status: 'ok',
  }
}
