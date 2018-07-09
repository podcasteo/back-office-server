import config from 'config'
import fetch from 'node-fetch'
import Debug from 'debug'

import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:publishPodcastToProduction')

async function getPodcasteoToken() {
  try {
    const user = {
      email: config.get('api.user.email'),
      password: config.get('api.user.password'),
    }
    const data = await fetch(`${config.get('api.url')}/users/login`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const {
      token,
    } = await data.json()

    debug('getPodcasteoToken - done')

    return token
  } catch (error) {
    debug('getPodcasteoToken - fail', error)

    throw error
  }
}

async function publishPodcast(item, token) {
  const podcast = {
    id: item.uuid,
    name: item.name,
    slug: item.slug,
    description: item.description,
    categorie: item.categorie,
    region: item.region,
    facebook: item.facebook.slug,
    twitter: item.twitter.slug,
    itunes: item.itunes.slug,
    isPodcasteo: item.isPodcasteo,
    haveLeadWomen: item.haveLeadWomen,
    haveWomen: item.haveWomen,
  }

  try {
    await fetch(`${config.get('api.url')}/podcasts`, {
      method: 'PUT',
      body: JSON.stringify(podcast),
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const newItem = item

    newItem.isProd = true

    await client.updatePodcast(newItem)

    debug('publishPodcast - done', podcast)

    return {
      upload: true,
    }
  } catch (error) {
    debug('publishPodcast - fail', error)

    return {
      upload: false,
    }
  }
}

async function publishPodcastsArray(query, first, offset, token) {
  try {
    const {
      data: array,
    } = await client.find(query, first, offset)
    const promises = array.map((item) => publishPodcast(item, token))

    await Promise.all(promises)

    debug('publishPodcastsArray - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('publishPodcastsArray - fail', error)

    return {
      batch: false,
    }
  }
}

export default async function publishPodcastToProduction() {
  const query = {
    isProd: false,
  }
  const parameters = {
    first: 40,
    offset: 0,
  }
  const token = await getPodcasteoToken()
  const {
    totalCount,
  } = await client.find(query, 1, 0)
  const promises = []

  while (totalCount > parameters.offset) {
    promises.push(publishPodcastsArray(query, parameters.first, parameters.offset, token))

    parameters.offset += parameters.first
  }

  try {
    await Promise.all(promises)

    debug('publishPodcastToProduction - done')

    return {
      result: true,
    }
  } catch (error) {
    debug('publishPodcastToProduction - fail', error)

    return {
      result: false,
    }
  }
}
