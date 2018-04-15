import extend from 'lodash'

import client from 'modules/users/client'

export default async function updateUser(id, data) {
  // verify id data and auth

  const itemDB = await client.findById(id)

  extend(itemDB, data)

  const result = await client.updateUser(itemDB)

  return result
}
