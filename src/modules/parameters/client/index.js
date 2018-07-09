import assignIn from 'lodash/assignIn'

import Schema from './schema'

async function find() {
  const schema = Schema.find()
  const query = schema.toConstructor()
  const data = await query().limit(1).skip(0).exec()

  return data[0]
}

async function createParameters(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

async function updateParameters(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

export default {
  find,
  createParameters,
  updateParameters,
}
