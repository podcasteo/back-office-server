import config from 'config'
import jwt from 'jsonwebtoken'

import userClient from 'services/api/users/clients'

export function tokenExtractor(req) {
  let extractToken = null

  if (req && req.headers.authorization) {
    extractToken = req.headers.authorization
  } else if (req && req.body.token) {
    extractToken = req.body.token
  } else if (req.query && req.query.api_key) {
    extractToken = req.query.api_key
  } else if (req && req.cookies && req.cookies.token) {
    extractToken = req.cookies.token
  }

  return extractToken
}

export async function handleToken(req, res, next) {
  const token = tokenExtractor(req)

  return jwt.verify(token, config.get('jwt.secretKey'), async (error, decoded) => {
    let user = null

    if (decoded) {
      user = await userClient.findById(decoded.id)
    }

    req.user = user

    return next()
  })
}

export function handleUser(req) {
  if (!req.user) {
    throw new Error('UNAUTHORIZED')
  }

  return req.user
}

export function handleRole(role, req) {
  const user = handleUser(req)
  let authorize = true

  if (role === 'SUPERADMIN') {
    if (user.role !== role) {
      authorize = false
    }
  } else if (role === 'ADMIN') {
    if (user.role === 'USER') {
      authorize = false
    }
  }

  if (!authorize) {
    throw new Error('NOT_ALLOW')
  }
}
