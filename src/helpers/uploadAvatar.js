import path from 'path'

import cloudinary from 'clients/cloudinary'
import BufferStream from 'helpers/BufferStream'

export default async (type, slug, stream) => {
  const uri = path.join(type, slug, 'avatar', 'default')
  let buffer = null

  if (typeof stream === 'object' && stream.constructor.name === 'FileStream') {
    buffer = stream
  } else {
    buffer = new BufferStream(stream)
  }

  return new Promise((resolve, reject) => {
    buffer.pipe(cloudinary.v2.uploader.upload_stream({
      resource_type: 'image',
      public_id: uri,
    }, (error, result) => {
      if (error) {
        reject(error)
      }

      resolve(result)
    }))
  })
}
