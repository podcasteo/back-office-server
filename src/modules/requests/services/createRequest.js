import client from 'modules/requests/client'

export default async function createRequest(data) {
  // verify data
  const result = await client.createRequest(data)

  return result
}
