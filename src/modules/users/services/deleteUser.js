import client from 'modules/users/client'

export default async function deleteUser(id) {
  // verify id and auth

  const result = await client.deleteUser(id)

  return result
}
