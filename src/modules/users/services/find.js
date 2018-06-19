import joi from 'joi'

import client from 'modules/users/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(options = {}) {
  const parameters = await joi.validate(options, {
    first: joi.number().min(1).default(20),
    offset: joi.number().min(0).default(0),
    username: joi.string().min(1),
    role: joi.string().min(1),
  })
  const {
    first,
    offset,
    username,
    role,
  } = parameters
  const query = {}

  if (username != null) {
    query.username = new RegExp(`^${username}`, 'i')
  }

  if (role != null) {
    query.role = role.toUpperCase()
  }

  const {
    totalCount,
    data,
  } = await client.find(query, first, offset)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
