import config from 'config'
import jwt from 'jsonwebtoken'

import client from 'modules/users/client'

function tokenExtractor(req) {
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

async function handleToken(req, res, next) {
  const token = tokenExtractor(req)

  return jwt.verify(token, config.get('jwt.secretKey'), async (error, decoded) => {
    let user = null

    if (decoded) {
      user = await client.findById(decoded.id)
    }

    req.user = user

    return next()
  })
}

function handleUser(req) {
  if (!req.user) {
    throw new Error('UNAUTHORIZED')
  }

  return req.user
}

function handleRole(role, req) {
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

export default {
  tokenExtractor,
  handleToken,
  handleUser,
  handleRole,
}
