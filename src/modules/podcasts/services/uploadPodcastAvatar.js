import assignIn from 'lodash/assignIn'

import uploadAvatar from 'helpers/uploadAvatar'
import client from 'modules/podcasts/client'

export default async function uploadPodcastAvatar(uuid, file) {
  const stream = file.buffer

  try {
    const podcast = await client.findByUuid(uuid)
    const result = await uploadAvatar('podcasts', podcast.slug, stream)

    assignIn(podcast, {
      avatar: result.url,
    })

    await client.updatePodcast(podcast)

    return client.findByUuid(uuid)
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw new Error('avatar upload failed')
  }
}
