import {
  Router,
} from 'express'

import authentification from 'services/middleware/authentification'
import services from 'modules/podcasts/services'

const router = Router()

async function getAll(req, res) {
  const result = await services.find(req.query)

  return res.send(result)
}

async function getOne(req, res) {
  const result = await services.findOne(req.params.id)

  return res.send(result)
}

async function createPodcast(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.createPodcast(req.body, user)

  return res.send(result)
}

async function updatePodcast(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.updatePodcast(req.params.id, req.body, user)

  return res.send(result)
}

async function deletePodcast(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.deletePodcast(req.params.id, user)

  return res.send(result)
}

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', createPodcast)
router.put('/:id', updatePodcast)
router.delete('/:id', deletePodcast)

export default router
