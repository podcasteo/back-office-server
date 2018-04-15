import client from 'modules/podcasts/client'

export default async function createPodcast(data) {
  // verify data
  const result = await client.createPodcast(data)

  return result
}
