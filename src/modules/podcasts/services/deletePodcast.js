import client from 'modules/podcasts/client'

export default async function deletePodcast(id) {
  // verify id and auth
  const result = await client.deletePodcast(id)

  return result
}
