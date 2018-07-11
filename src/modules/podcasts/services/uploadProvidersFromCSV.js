import neatCSV from 'neat-csv'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'
import Debug from 'debug'

import handleFirstDate from 'helpers/handleFirstDate'
import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:uploadProvidersFromCSV')

async function updatePodcastProvider(firstDate, podcastInput) {
  try {
    const podcast = await client.findByName(podcastInput.Podcast)

    debug('updatePodcastProvider - init', podcastInput)

    const itunes = {
      date: firstDate,
      trackCount: null,
      lastRelease: null,
      ratingCount: podcastInput['Nb Avis'],
      frequency: podcastInput['Fréquence (ep/mois)'],
      followers: null,
    }
    const twitter = {
      date: firstDate,
      followers: podcastInput['Follow Twitter'],
    }
    const animateur = {
      date: firstDate,
      followers: podcastInput['Follow Twitter Animateur'],
    }
    const facebook = {
      date: firstDate,
      followers: podcastInput['Likes FB'],
    }
    const itunesIndex = findIndex(podcast.itunes.data, (item) => item.date.toISOString() === firstDate)
    const twitterIndex = findIndex(podcast.twitter.data, (item) => item.date.toISOString() === firstDate)
    const animateurIndex = findIndex(podcast.animateur.data, (item) => item.date.toISOString() === firstDate)
    const facebookIndex = findIndex(podcast.facebook.data, (item) => item.date.toISOString() === firstDate)

    if (itunesIndex < 0) {
      podcast.itunes.data.push(itunes)
    } else {
      podcast.itunes.data.splice(itunesIndex, 1, itunes)
    }

    podcast.itunes.data = orderBy(podcast.itunes.data, ['date'], ['desc']) // eslint-disable-line

    if (twitterIndex < 0) {
      podcast.twitter.data.push(twitter)
    } else {
      podcast.twitter.data.splice(twitterIndex, 1, twitter)
    }

    podcast.twitter.data = orderBy(podcast.twitter.data, ['date'], ['desc']) // eslint-disable-line

    if (animateurIndex < 0) {
      podcast.animateur.data.push(animateur)
    } else {
      podcast.animateur.data.splice(animateurIndex, 1, animateur)
    }

    podcast.animateur.data = orderBy(podcast.animateur.data, ['date'], ['desc']) // eslint-disable-line

    if (facebookIndex < 0) {
      podcast.facebook.data.push(facebook)
    } else {
      podcast.facebook.data.splice(facebookIndex, 1, facebook)
    }

    podcast.facebook.data = orderBy(podcast.facebook.data, ['date'], ['desc']) // eslint-disable-line

    await client.updatePodcast(podcast)

    debug('updatePodcastProvider - done', podcast)

    return {
      create: true,
    }
  } catch (error) {
    debug('updatePodcastProvider - fail', error)

    return {
      create: false,
    }
  }
}

async function updatePodcastsProvider(firstDate, podcasts) {
  try {
    const promises = podcasts.map((item) => updatePodcastProvider(firstDate, item))

    await Promise.all(promises)

    debug('updatePodcastsProvider - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('updatePodcastsProvider - fail', error)

    return {
      batch: false,
    }
  }
}

export default async function uploadProvidersFromCSV(date, file) {
  const firstDate = handleFirstDate(date)
  const podcasts = await neatCSV(file.buffer, {
    separator: '\t', // specify optional cell separator
  })

  try {
    await updatePodcastsProvider(firstDate, podcasts)

    debug('uploadProvidersFromCSV - done')

    return {
      result: true,
    }
  } catch (error) {
    debug('uploadProvidersFromCSV - fail', error)

    return {
      result: false,
    }
  }
}
