import config from 'config'
import Debug from 'debug'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import fetch from 'node-fetch'

import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:publishPodcastToProduction')

function getProviderData(type, provider) {
  const result = {
    type,
    createdAt: provider.date,
    trackCount: provider.trackCount,
    lastRelease: provider.lastRelease,
    ratingCount: provider.ratingCount,
    frequency: provider.frequency,
    followers: provider.followers,
  }
  const data = omitBy(result, isNil)

  return data
}

async function publishPodcastProviders(item, token) {
  const promises = []

  item.itunes.data.forEach((itunes) => {
    promises.push(fetch(`${config.get('api.url')}/podcasts/${item.uuid}/providers`, {
      method: 'PUT',
      body: JSON.stringify(getProviderData('itunes', itunes)),
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))
  })

  item.twitter.data.forEach((twitter) => {
    promises.push(fetch(`${config.get('api.url')}/podcasts/${item.uuid}/providers`, {
      method: 'PUT',
      body: JSON.stringify(getProviderData('twitter', twitter)),
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))
  })

  item.facebook.data.forEach((facebook) => {
    promises.push(fetch(`${config.get('api.url')}/podcasts/${item.uuid}/providers`, {
      method: 'PUT',
      body: JSON.stringify(getProviderData('facebook', facebook)),
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))
  })

  try {
    await Promise.all(promises)

    debug('publishPodcastProviders - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('publishPodcastProviders - fail', error)

    return {
      batch: false,
    }
  }
}

async function publishPodcastRankings(item, token) {
  const promises = []

  item.ranking.forEach((ranking) => {
    promises.push(fetch(`${config.get('api.url')}/podcasts/${item.uuid}/rankings`, {
      method: 'PUT',
      body: JSON.stringify({
        createdAt: ranking.date,
        score: ranking.score,
        ranking: ranking.ranking,
        audienceScore: ranking.audienceScore,
        audienceGrade: ranking.audienceGrade,
        frequencyScore: ranking.frequencyScore,
        frequencyGrade: ranking.frequencyGrade,
        networkScore: ranking.networkScore,
        networkGrade: ranking.networkGrade,
        itunesScore: ranking.itunesScore,
        itunesGrade: ranking.itunesGrade,
        traineeScore: ranking.traineeScore,
        traineeGrade: ranking.traineeGrade,
      }),
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))
  })

  try {
    await Promise.all(promises)

    debug('publishPodcastRankings - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('publishPodcastRankings - fail', error)

    return {
      batch: false,
    }
  }
}

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

    await publishPodcastProviders(item, token)
    await publishPodcastRankings(item, token)

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

export default async function publishPodcastToProduction(queryParams) {
  const query = {
    isProd: queryParams.all || false,
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
