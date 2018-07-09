import path from 'path'

import s3Bucket from 'clients/aws'
import client from 'modules/podcasts/client'

export default async function uploadPodcastAvatar(uuid, file) {
  const podcast = await client.findByUuid(uuid)
  const uri = path.join('podcasts', uuid, 'avatar', 'default.jpg')
  const stream = file.buffer

  await s3Bucket.upload({
    Key: uri,
    Body: stream,
    ContentType: 'image/jpeg',
  }).promise()

  return podcast
}
