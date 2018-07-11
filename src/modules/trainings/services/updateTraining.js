import assignIn from 'lodash/assignIn'

import client from 'modules/trainings/client'

export default async function updateTraining(id, data) {
  const itemDB = await client.findById(id)

  assignIn(itemDB, data)

  const result = await client.updateTraining(itemDB)

  return result
}
