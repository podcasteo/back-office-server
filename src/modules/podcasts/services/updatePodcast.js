import assignIn from 'lodash/assignIn'

import client from 'modules/podcasts/client'

export default async function updatePodcast(id, data) {
  // verify id data and auth

  const itemDB = await client.findById(id)

  assignIn(itemDB, data)

  const result = await client.updatePodcast(itemDB)

  return result
}
