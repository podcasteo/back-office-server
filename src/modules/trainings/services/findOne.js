import client from 'modules/trainings/client'

export default async function findOne(parameters) {
  let result

  if (parameters.id) {
    result = await client.findById(parameters.id)
  } else if (parameters.name) {
    result = await client.findByName(parameters.name)
  }

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
