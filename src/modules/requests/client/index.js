import mongoose from 'mongoose'
import assignIn from 'lodash/assignIn'

import Schema from './schema'

async function find(parameters, first, offset) {
  const schema = Schema.find(parameters)
  const query = schema.toConstructor()
  const totalCount = await schema.count().exec()
  const data = await query().limit(first).skip(offset).exec()

  return {
    totalCount,
    data,
  }
}

function findById(id) {
  return Schema.findOne({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

function createRequest(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function updateRequest(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function deleteRequest(id) {
  return Schema.findOneAndRemove({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

export default {
  find,
  findById,
  createRequest,
  updateRequest,
  deleteRequest,
}
