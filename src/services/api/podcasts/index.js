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

async function createPodcastsFromCSV(req, res) {
  const user = authentification.handleUser(req)
  const {
    file,
  } = req
  const result = await services.createPodcastsFromCSV(file, user)

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
  const user = authentification.handleUser(req)
  const result = await services.publishPodcastToProduction(user)

  return res.send(result)
}

router.get('/', getAll)
router.get('/id/:id', getOne)
router.get('/uuid/:uuid', getOne)
router.get('/name/:name', getOne)
router.get('/slug/:slug', getOne)
router.put('/', createOrUpdatePodcast)
router.delete('/:id', deletePodcast)

router.post('/avatar/:uuid', upload.single('file'), uploadPodcastAvatar)
router.post('/csv/upload/init', upload.single('file'), createPodcastsFromCSV)

router.post('/publish', publishPodcastToProduction)

export default router
