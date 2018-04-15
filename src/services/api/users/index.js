import {
  Router,
} from 'express'

import authentification from 'services/middleware/authentification'
import services from 'modules/users/services'

const router = Router()

async function getAll(req, res) {
  authentification.handleUser(req)

  const result = await services.find(req.query)

  return res.send(result)
}

async function getOne(req, res) {
  const result = await services.findOne(req.params.id)

  return res.send(result)
}

async function createUser(req, res) {
  const result = await services.createUser(req.body)

  return res.send(result)
}

async function updateUser(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.updateUser(req.params.id, req.body, user)

  return res.send(result)
}

async function deleteUser(req, res) {
  const result = await services.deleteUser(req.params.id)

  return res.send(result)
}

async function login(req, res) {
  const result = await services.login(req.body)

  return res.send(result)
}

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', login)

export default router
