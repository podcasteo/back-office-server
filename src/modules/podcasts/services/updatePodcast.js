import extend from 'lodash'

import client from 'modules/podcasts/client'

export default async function updatePodcast(id, data) {
  // verify id data and auth

  const itemDB = await client.findById(id)

  extend(itemDB, data)

  const result = await client.updatePodcast(itemDB)

  return result
}
