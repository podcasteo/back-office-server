import {
  Router,
} from 'express'
import multer from 'multer'

import authentification from 'services/middleware/authentification'
import services from 'modules/trainings/services'

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage,
})

async function getAll(req, res) {
  const result = await services.find(req.query)

  return res.send(result)
}

async function getOne(req, res) {
  const result = await services.findOne(req.params)

  return res.send(result)
}

async function createOrUpdateTraining(req, res) {
  const user = authentification.handleUser(req)
  const data = req.body
  let result

  if (!data.id) {
    result = await services.createTraining(data, user)
  } else {
    result = await services.updateTraining(data.id, data, user)
  }

  return res.send(result)
}

async function deleteTraining(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.deleteTraining(req.params.id, user)

  return res.send(result)
}

async function uploadTrainingsFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadTrainingsFromCSV(file, user)

  return res.send(result)
}

async function downloadTrainingsCSV(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.downloadTrainingsCSV(user)

  res.setHeader('Content-disposition', 'attachment; filename=trainings.tsv')
  res.set('Content-Type', 'text/tsv')
  res.status(200).send(result)
}

router.get('/', getAll)
router.get('/id/:id', getOne)
router.get('/uuid/:uuid', getOne)
router.get('/name/:name', getOne)
router.get('/slug/:slug', getOne)
router.put('/', createOrUpdateTraining)
router.delete('/:id', deleteTraining)

router.post('/csv/upload', upload.single('file'), uploadTrainingsFromCSV)
router.get('/csv/download', downloadTrainingsCSV)

export default router
