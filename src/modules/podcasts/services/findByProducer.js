import joi from 'joi'

import client from 'modules/podcasts/client'

export default async function findByProducer(producer) {
  joi.assert(producer, joi.string(), 'producer')

  const data = await client.findByProducer(producer)

  return data
}
