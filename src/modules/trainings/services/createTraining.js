import client from 'modules/trainings/client'

export default async function createTraining(data) {
  const result = await client.createTraining(data)

  return result
}
