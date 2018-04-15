import {
  Router,
} from 'express'

const router = Router()

import api from 'services/api'
import authentification from 'services/middleware/authentification'
import error from 'services/middleware/error'

router.use(authentification.handleToken)
router.use('/api', api)
router.use(error.handleError)

export default router
