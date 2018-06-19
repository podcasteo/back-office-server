import joi from 'joi'

import client from 'modules/requests/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(options = {}) {
  const parameters = await joi.validate(options, {
    first: joi.number().min(1).default(20),
    offset: joi.number().min(0).default(0),
    action: joi.string().min(1),
    type: joi.string().min(1),
  })
  const {
    first,
    offset,
    action,
    type,
  } = parameters
  const query = {}

  if (action != null) {
    query.action = action.toUpperCase()
  }

  if (type != null) {
    query.type = type.toUpperCase()
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
