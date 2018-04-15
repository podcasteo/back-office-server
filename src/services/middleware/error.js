function handleError(error, req, res, next) { //eslint-disable-line
  return res.status(400).send({
    error: 'BAD_REQUEST',
    code: 400,
    origin: error.message,
  })
}

function wrapAsync(fn) {
  return (req, res, next) => fn(req, res).catch(next)
}

export default {
  handleError,
  wrapAsync,
}
