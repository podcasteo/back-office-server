import client from 'modules/podcasts/client'

export default async function findOne(parameters) {
  let result

  if (parameters.id) {
    result = await client.findById(parameters.id)
  } else if (parameters.uuid) {
    result = await client.findByUuid(parameters.uuid)
  } else if (parameters.slug) {
    result = await client.findBySlug(parameters.slug)
  } else if (parameters.name) {
    result = await client.findByName(parameters.name)
  }

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
