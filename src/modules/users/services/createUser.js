import bcrypt from 'bcryptjs'

import client from 'modules/users/client'

export default async function createUser(data) {
  // verify data

  const salt = await bcrypt.genSalt(5)
  const hash = await bcrypt.hash(data.password, salt)
  const user = {
    ...data,
    password: hash,
  }
  const result = await client.createUser(user)

  return result
}
