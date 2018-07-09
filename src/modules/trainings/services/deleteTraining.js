import client from 'modules/trainings/client'

export default async function deleteTraining(id) {
  const result = await client.deleteTraining(id)

  return result
}
