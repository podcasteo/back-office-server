import joi from 'joi'

import client from 'modules/trainings/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(options = {}) {
  const parameters = await joi.validate(options, {
    first: joi.number().min(1).default(20),
    offset: joi.number().min(0).default(0),
    name: joi.string().min(1),
  })
  const {
    first,
    offset,
    name,
  } = parameters
  const query = {}

  if (name != null) {
    query.$or = [
      {
        name: new RegExp(`^${name}`, 'i'),
      },
      {
        slug: new RegExp(`^${name}`, 'i'),
      },
    ]
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
