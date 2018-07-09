import assignIn from 'lodash/assignIn'

import client from 'modules/parameters/client'

export default async function updateParameters(data) {
  const itemDB = await client.find()

  assignIn(itemDB, data)

  const result = await client.updateParameters(itemDB)

  return result
}
