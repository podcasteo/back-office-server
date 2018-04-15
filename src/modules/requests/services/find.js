import client from 'modules/requests/client'

export default async function find(research) {
  // verify research

  const result = await client.find(research)

  return result
}
