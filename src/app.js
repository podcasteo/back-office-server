/* eslint-disable no-console */
import 'express-async-errors'
import asciify from 'asciify'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from 'config'
import express from 'express'
import queryParser from 'express-query-int'
import mongoose from 'mongoose'

import services from 'services'

const packageJson = require(`${process.cwd()}/package.json`)// eslint-disable-line import/no-dynamic-require
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.disable('x-powered-by')

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(queryParser())
app.use(compression())

app.use(services)
app.set('json spaces', 2)

mongoose.connect(config.get('mongo.url'))

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
