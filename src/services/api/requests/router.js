import {
  Router,
} from 'express'

import controller from 'services/api/requests/controller'

const router = Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/:id', controller.handleRequest)

export default router
