/* eslint-disable no-console */
import asciify from 'asciify'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from 'config'
import express from 'express'
import queryParser from 'express-query-int'

import services from 'services'

const packageJson = require(`${process.cwd()}/package.json`)// eslint-disable-line import/no-dynamic-require
const app = express()

app.disable('x-powered-by')

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.use(queryParser())

app.use(compression())

app.use(services)

const port = config.get('server.port')

module.exports = () => {
  asciify('BACK-OFFICE-SERVER', {
    color: 'green',
    font: 'smslant',
  }, (err, result) => {
    console.log(result.replace(/\n$/, ''))
    console.log(`Back-office-server ::::::::::::::::::::::::::::::: v${packageJson.version}\n\n`)
    app.listen(port, () => {
      console.log(`Server listening on ::${port}`)
    })
  })
}

module.exports.app = app
