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

function findByEmail(email) {
  return Schema.findOne({
    email,
  }).exec()
}

function createUser(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function updateUser(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function deleteUser(id) {
  return Schema.findOneAndRemove({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

export default {
  find,
  findById,
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
}
