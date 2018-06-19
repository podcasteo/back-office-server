import mongoose from 'mongoose'
import assignIn from 'lodash/assignIn'

import Schema from './schema'

function find(query) {
  const search = {}

  if (query.name) {
    search.name = new RegExp(`^${query.name}`, 'i')
  }

  return Schema.find(search).exec()
}

function findById(id) {
  return Schema.findOne({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

function createPodcast(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function updatePodcast(data) {
  const dbItem = Schema()

  assignIn(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function deletePodcast(id) {
  return Schema.findOneAndRemove({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

export default {
  find,
  findById,
  createPodcast,
  updatePodcast,
  deletePodcast,
}
