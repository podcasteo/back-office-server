import mongoose from 'mongoose'
import extend from 'lodash/extend'

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

  extend(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function updateRequest(data) {
  const dbItem = Schema()

  extend(dbItem, data)

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
