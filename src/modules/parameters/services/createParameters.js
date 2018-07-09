import client from 'modules/parameters/client'

export default async function createParameters(data) {
  const item = await client.find()

  if (item) {
    throw new Error('ONLY_ONE_PARAMETERS_ALLOW')
  }

  const result = await client.createParameters(data)

  return result
}
