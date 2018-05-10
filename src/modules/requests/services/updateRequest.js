import assignIn from 'lodash/assignIn'

import client from 'modules/requests/client'

export default async function updateRequest(id, data) {
  // verify id data and auth

  const itemDB = await client.findById(id)

  assignIn(itemDB, data)

  const result = await client.updateRequest(itemDB)

  return result
}
