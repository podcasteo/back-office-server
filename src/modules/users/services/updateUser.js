import assignIn from 'lodash/assignIn'

import client from 'modules/users/client'

export default async function updateUser(id, data) {
  // verify id data and auth

  const itemDB = await client.findById(id)

  assignIn(itemDB, data)

  const result = await client.updateUser(itemDB)

  return result
}
