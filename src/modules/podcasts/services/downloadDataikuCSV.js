import Debug from 'debug'
import findIndex from 'lodash/findIndex'
import flatten from 'lodash/flatten'
import {
  Parser as Json2csvParser,
} from 'json2csv'

import handleFirstDate from 'helpers/handleFirstDate'
import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:downloadDataikuCSV')
const fields = [
  {
    label: 'Podcast',
    value: 'name',
  },
  {
    label: 'Producteur',
    value: 'producer',
  },
  {
    label: 'Nb Avis',
    value: 'nb_avis',
    stringify: true,
  },
  {
    label: 'Affiliation',
    value: 'affiliation',
    stringify: true,
  },
  {
    label: 'Likes FB',
    value: 'likes_fb',
    stringify: true,
  },
  {
    label: 'Follow Twitter',
    value: 'follow_twitter',
    stringify: true,
  },
  {
    label: 'Follow Twitter Animateur',
    value: 'follow_animateur',
    stringify: true,
  },
  {
    label: 'Age',
    value: 'age',
    stringify: true,
  },
  {
    label: 'Fréquence (ep/mois)',
    value: 'frequency',
    stringify: true,
  },
]

async function getAffiliation(podcast, firstDate) {
  const podcasts = await client.findByProducer(podcast.producer)
  let affiliation = 0

  if (podcasts.length < 2) {
    return affiliation
  }

  podcasts.forEach((item) => {
    const itunesIndex = findIndex(item.itunes.data, (provider) => provider.date.toISOString() === firstDate)

    affiliation += itunesIndex < 0 ? 0 : item.itunes.data[itunesIndex].ratingCount
  })

  return affiliation
}

async function getDataikuItem(podcast, firstDate) {
  const dataikuItem = {
    name: podcast.name,
    producer: podcast.producer,
    age: (((new Date(firstDate)).getTime() - (new Date(podcast.firstRelease)).getTime()) / 31556952000).toFixed(2),
  }
  const itunesIndex = findIndex(podcast.itunes.data, (item) => item.date.toISOString() === firstDate)
  const twitterIndex = findIndex(podcast.twitter.data, (item) => item.date.toISOString() === firstDate)
  const animateurIndex = findIndex(podcast.animateur.data, (item) => item.date.toISOString() === firstDate)
  const facebookIndex = findIndex(podcast.facebook.data, (item) => item.date.toISOString() === firstDate)

  if (itunesIndex < 0) {
    dataikuItem.nb_avis = 0
    dataikuItem.frequency = 0
  } else {
    dataikuItem.nb_avis = podcast.itunes.data[itunesIndex].ratingCount
    dataikuItem.frequency = podcast.itunes.data[itunesIndex].frequency
  }

  if (twitterIndex < 0) {
    dataikuItem.follow_twitter = 0
  } else {
    dataikuItem.follow_twitter = podcast.twitter.data[twitterIndex].followers
  }

  if (animateurIndex < 0) {
    dataikuItem.follow_animateur = 0
  } else {
    dataikuItem.follow_animateur = podcast.animateur.data[animateurIndex].followers
  }

  if (facebookIndex < 0) {
    dataikuItem.likes_fb = 0
  } else {
    dataikuItem.likes_fb = podcast.facebook.data[facebookIndex].followers
  }

  try {
    dataikuItem.affiliation = await getAffiliation(podcast, firstDate)

    return dataikuItem
  } catch (error) {
    dataikuItem.affiliation = 0

    return dataikuItem
  }
}

async function getDataikuArray(query, first, offset, firstDate) {
  try {
    const {
      data: array,
    } = await client.find(query, first, offset)
    const promises = array.map((item) => getDataikuItem(item, firstDate))
    const results = await Promise.all(promises)

    debug('getDataikuArray - done')

    return results
  } catch (error) {
    debug('getDataikuArray - fail', error)

    return [
      {
        batch: false,
      },
    ]
  }
}

export default async function downloadDataikuCSV(date) {
  const firstDate = handleFirstDate(date)
  const query = {}
  const parameters = {
    first: 40,
    offset: 0,
  }
  const {
    totalCount,
  } = await client.find(query, 1, 0)
  const promises = []

  while (totalCount > parameters.offset) {
    promises.push(getDataikuArray(query, parameters.first, parameters.offset, firstDate))

    parameters.offset += parameters.first
  }

  const array = flatten(await Promise.all(promises))
  const json2csvParser = new Json2csvParser({
    fields,
    delimiter: '\t',
    quote: '',
  })

  debug('downloadDataikuCSV - generator', array)

  const tsv = json2csvParser.parse(array)

  return tsv
}
