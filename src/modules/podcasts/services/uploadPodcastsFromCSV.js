import config from 'config'
import assignIn from 'lodash/assignIn'
import neatCSV from 'neat-csv'
import uuidv4 from 'uuid/v4'
import Debug from 'debug'

import handleFirstDate from 'helpers/handleFirstDate'
import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:uploadPodcastsFromCSV')
const categories = config.get('csv.categories')

function mapCategorie(inputCategorie) {
  return categories[inputCategorie]
}

function getItunesSlug(url) {
  const urls = url.split('?')[0].split('/')

  return `${urls[urls.length - 2]}/${urls[urls.length - 1]}`
}

function getSlug(url) {
  const urls = url.split('?')[0].split('/')

  return urls[urls.length - 1].length > 0 ? urls[urls.length - 1] : urls[urls.length - 2]
}

async function createPodcast(podcastInput) {
  try {
    const podcast = {
      name: podcastInput.podcast,
      uuid: uuidv4(),
      slug: podcastInput.id,
      producer: podcastInput.producteur,
      description: podcastInput.description,
      isInactif: (podcastInput.inactif === 'X'),
      isPodcasteo: (podcastInput.podcasteo === 'X'),
      categorie: mapCategorie(podcastInput.categorie),
      region: podcastInput.region,
      haveLeadWomen: (podcastInput.leadWoman === 'Oui'),
      haveWomen: (podcastInput.presenceWomen === 'Oui' || podcastInput.leadWoman === 'Oui'),
      itunes: {
        url: podcastInput.linkItunes,
        slug: getItunesSlug(podcastInput.linkItunes),
      },
      twitter: {
        url: podcastInput.linkTwitter,
        slug: getSlug(podcastInput.linkTwitter),
      },
      facebook: {
        url: podcastInput.linkFB,
        slug: getSlug(podcastInput.linkFB),
      },
      animateur: {
        url: podcastInput.linkTwitterAnim,
        slug: getSlug(podcastInput.linkTwitterAnim),
      },
    }

    podcast.firstRelease = new Date(handleFirstDate((new Date()).toISOString()))

    if (podcastInput.age) {
      podcast.firstRelease.setTime(podcast.firstRelease.getTime() - (podcastInput.age * 31556952000))
    }

    podcast.firstRelease = podcast.firstRelease.toISOString()

    const findOne = await client.findByName(podcast.name)

    if (!findOne) {
      await client.createPodcast(podcast)
    } else {
      delete podcast.ranking
      delete podcast.itunes
      delete podcast.twitter
      delete podcast.facebook
      delete podcast.animateur

      assignIn(findOne, podcast)

      await client.updatePodcast(findOne)
    }

    debug('createPodcast - done', podcast)

    return {
      create: true,
    }
  } catch (error) {
    debug('createPodcast - fail', error)

    return {
      create: false,
    }
  }
}

async function createPodcastsArray(podcasts) {
  try {
    const promises = podcasts.map((item) => createPodcast(item))

    await Promise.all(promises)

    debug('createPodcastsArray - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('createPodcastsArray - fail', error)

    return {
      batch: false,
    }
  }
}

export default async function uploadPodcastsFromCSV(file) {
  const podcasts = await neatCSV(file.buffer)

  try {
    await createPodcastsArray(podcasts)

    debug('uploadPodcastsFromCSV - done')

    return {
      result: true,
    }
  } catch (error) {
    debug('uploadPodcastsFromCSV - fail', error)

    return {
      result: false,
    }
  }
}
