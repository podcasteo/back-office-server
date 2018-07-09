import client from 'modules/parameters/client'

export default async function findOne() {
  const result = await client.find()

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
