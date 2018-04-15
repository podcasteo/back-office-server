import client from 'modules/requests/client'

export default async function deleteRequest(id) {
  // verify id and auth
  const result = await client.deleteRequest(id)

  return result
}
