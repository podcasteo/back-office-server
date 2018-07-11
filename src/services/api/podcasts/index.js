import {
  Router,
} from 'express'
import multer from 'multer'

import authentification from 'services/middleware/authentification'
import services from 'modules/podcasts/services'

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

async function createOrUpdatePodcast(req, res) {
  const user = authentification.handleUser(req)
  const data = req.body
  let result

  if (!data.id) {
    result = await services.createPodcast(data, user)
  } else {
    result = await services.updatePodcast(data.id, data, user)
  }

  return res.send(result)
}

async function deletePodcast(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.deletePodcast(req.params.id, user)

  return res.send(result)
}

async function uploadPodcastsFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadPodcastsFromCSV(file, user)

  return res.send(result)
}

async function uploadRankingsFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadRankingsFromCSV(req.params.date, file, user)

  return res.send(result)
}

async function uploadProvidersFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadProvidersFromCSV(req.params.date, file, user)

  return res.send(result)
}

async function uploadPodcastAvatar(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadPodcastAvatar(req.params.uuid, file, user)

  return res.send(result)
}

async function publishPodcastToProduction(req, res) {
  const {
    query,
  } = req
  const user = authentification.handleUser(req)
  const result = await services.publishPodcastToProduction(query, user)

  return res.send(result)
}

async function uploadDataikuFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.uploadDataikuFromCSV(req.params.date, file, user)

  return res.send(result)
}

async function downloadDataikuCSV(req, res) {
  const user = authentification.handleUser(req)
  const result = await services.downloadDataikuCSV(req.params.date, user)

  res.setHeader('Content-disposition', 'attachment; filename=trainings.tsv')
  res.set('Content-Type', 'text/tsv')
  res.status(200).send(result)
}

router.get('/', getAll)
router.get('/id/:id', getOne)
router.get('/uuid/:uuid', getOne)
router.get('/name/:name', getOne)
router.get('/slug/:slug', getOne)
router.put('/', createOrUpdatePodcast)
router.delete('/:id', deletePodcast)

router.post('/avatar/:uuid', upload.single('file'), uploadPodcastAvatar)
router.post('/csv/upload/init', upload.single('file'), uploadPodcastsFromCSV)
router.post('/csv/upload/rankings/:date', upload.single('file'), uploadRankingsFromCSV)
router.post('/csv/upload/providers/:date', upload.single('file'), uploadProvidersFromCSV)
router.post('/csv/upload/dataiku/:date', upload.single('file'), uploadDataikuFromCSV)
router.get('/csv/download/dataiku/:date', downloadDataikuCSV)

router.post('/publish', publishPodcastToProduction)

export default router
