import {
  Router,
} from 'express'

import users from 'services/api/users/router'
import podcasts from 'services/api/podcasts/router'
import requests from 'services/api/requests/router'

const router = Router()

router.use('/users', users)
router.use('/podcasts', podcasts)
router.use('/requests', requests)

router.get('/', (req, res) => {
  res.send({
    user: {
      getAll: {
        method: 'GET',
        url: '/users',
      },
      getOne: {
        method: 'GET',
        url: '/users/:id',
      },
      create: {
        method: 'POST',
        url: '/users',
      },
      update: {
        method: 'PUT',
        url: '/users/:id',
      },
      delete: {
        method: 'DELETE',
        url: '/users/:id',
      },
      login: {
        method: 'POST',
        url: '/users/login',
      },
    },
    podcast: {
      getAll: {
        method: 'GET',
        url: '/podcasts',
      },
      getOne: {
        method: 'GET',
        url: '/podcasts/:id',
      },
      create: {
        method: 'POST',
        url: '/podcasts',
      },
      update: {
        method: 'PUT',
        url: '/podcasts/:id',
      },
      delete: {
        method: 'DELETE',
        url: '/podcasts/:id',
      },
    },
    request: {
      getAll: {
        method: 'GET',
        url: '/requests',
      },
      getOne: {
        method: 'GET',
        url: '/requests/:id',
      },
      create: {
        method: 'POST',
        url: '/requests',
      },
      update: {
        method: 'PUT',
        url: '/requests/:id',
      },
      delete: {
        method: 'DELETE',
        url: '/requests/:id',
      },
      handleRequest: {
        method: 'POST',
        url: '/requests/:id',
      },
    },
  })
})

export default router
