import {
  Router,
} from 'express'

import authentification from 'services/middleware/authentification'
import services from 'modules/parameters/services'

const router = Router()

async function getOne(req, res) {
  const result = await services.findOne()

  return res.send(result)
}

async function createOrUpdateParameters(req, res) {
  const user = authentification.handleUser(req)

  try {
    const result = await services.updateParameters(req.body, user)

    return res.send(result)
  } catch (error) {
    const result = await services.createParameters(req.body, user)

    return res.send(result)
  }
}

router.get('/', getOne)
router.put('/', createOrUpdateParameters)

export default router
