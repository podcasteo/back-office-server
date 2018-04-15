import client from 'modules/requests/client'

export default async function findOne(id) {
  // verify id

  const result = await client.findById(id)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
