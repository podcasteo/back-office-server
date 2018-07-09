import path from 'path'

import s3Bucket from 'clients/aws'

export default function getSignedAvatar(type, uuid) {
  const uri = path.join(type, uuid, 'avatar', 'default.jpg')
  const params = {
    Key: uri,
    Expires: 3600,
  }
  const url = s3Bucket.getSignedUrl('getObject', params)

  return url
}
