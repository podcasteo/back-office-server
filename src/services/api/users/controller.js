import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'
import extend from 'lodash/extend'

import clients from 'services/api/users/clients'
import {
  handleUser,
  handleRole,
} from 'services/api/middleware/authentification'

async function getAll(req, res) {
  let research = null

  if (req.query) {
    research = req.query
    delete research.api_key
  }

  const result = await clients.find(research)

  return res.send(result)
}

async function getOne(req, res) {
  const {
    id,
  } = req.params
  const result = await clients.findById(id)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return res.send(result)
}

async function createUser(req, res) {
  const data = req.body
  const salt = await bcrypt.genSalt(5)
  const hash = await bcrypt.hash(data.password, salt)

  data.password = hash

  const result = await clients.createUser(data)

  return res.send(result)
}

async function updateUser(req, res) {
  handleUser(req)

  const {
    id,
  } = req.params
  const {
    _id,
    role,
    password,
    ...update
  } = req.body
  const user = await clients.findById(id)

  extend(user, update)

  const result = await clients.updateUser(user)

  return res.send(result)
}

async function deleteUser(req, res) {
  handleRole('SUPERADMIN', req)

  const {
    id,
  } = req.params
  const result = await clients.deleteUser(id)

  return res.send(result)
}

async function login(req, res) {
  const connexion = req.body
  const user = await clients.findByEmail(connexion.email)

  if (!user) {
    throw new Error('NOT_FOUND')
  }

  const validAuth = await bcrypt.compare(connexion.password, user.password)

  if (!validAuth) {
    throw new Error('INVALID_PASSWORD')
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    config.get('jwt.secretKey'),
    {
      expiresIn: config.get('jwt.expiresIn'),
    },
  )

  return res.send({
    token,
  })
}

export default {
  getAll,
  getOne,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  login,
}
