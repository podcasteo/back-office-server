import mongoose from 'mongoose'
import assignIn from 'lodash/assignIn'

import Schema from './schema'

function find(query) {
  return Schema.find(query).exec()
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
