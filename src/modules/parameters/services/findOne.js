import client from 'modules/parameters/client'

export default async function findOne() {
  const result = await client.find()

  if (!result) {
    return {}
  }

  return result
}
