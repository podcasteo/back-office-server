import mongoose from 'mongoose'
import extend from 'lodash/extend'

import Schema from './schema'

function find(query) {
  const name = new RegExp(`^${query.name}`, 'i')

  return Schema.find({
    name,
  }).exec()
}

function findById(id) {
  return Schema.findOne({
    _id: mongoose.Types.ObjectId(id),
  }).exec()
}

function createPodcast(data) {
  const dbItem = Schema()

  extend(dbItem, data)

  return dbItem.save()
    .then(() => dbItem)
}

function updatePodcast(data) {
  const dbItem = Schema()

  extend(dbItem, data)

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
