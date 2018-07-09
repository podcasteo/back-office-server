import joi from 'joi'

import client from 'modules/trainings/client'

export default async function findByProducer(producer) {
  joi.assert(producer, joi.string(), 'producer')

  const {
    data,
  } = await client.find({
    producer,
  }, 10000, 0)

  return data
}
