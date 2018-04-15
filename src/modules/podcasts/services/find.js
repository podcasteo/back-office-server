import client from 'modules/podcasts/client'

export default async function find(research) {
  // verify research

  const result = await client.find(research)

  return result
}
