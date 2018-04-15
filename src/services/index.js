import {
  Router,
} from 'express'

const router = Router()

import api from 'services/api'
import {
  handleToken,
} from 'services/api/middleware/authentification'
import {
  handleError,
} from 'services/api/middleware/error'

router.use(handleToken)
router.use('/api', api)
router.use(handleError)

export default router
