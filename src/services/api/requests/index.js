import {
  Router,
} from 'express'

import authentification from 'services/middleware/authentification'
import services from 'modules/requests/services'

const router = Router()

async function getAll(req, res) {
  const result = await services.find(req.query)

  return res.send(result)
}

async function getOne(req, res) {
  const result = await services.findOne(req.params.id)

  return res.send(result)
}

async function createRequest(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.createRequest(req.body, user)

  return res.send(result)
}

async function updateRequest(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.updateRequest(req.params.id, req.body, user)

  return res.send(result)
}

async function deleteRequest(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.deleteRequest(req.params.id, user)

  return res.send(result)
}

async function handleRequest(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.handleRequest(req.params.id, req.body, user)

  return res.send(result)
}

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', createRequest)
router.put('/:id', updateRequest)
router.delete('/:id', deleteRequest)
router.post('/:id', handleRequest)

export default router
