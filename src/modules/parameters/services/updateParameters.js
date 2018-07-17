import assignIn from 'lodash/assignIn'

import client from 'modules/parameters/client'

export default async function updateParameters(data) {
  let itemDB = await client.find()

  if (!itemDB) {
    itemDB = {}
  }

  assignIn(itemDB, data)

  const result = await client.updateParameters(itemDB)

  return result
}
