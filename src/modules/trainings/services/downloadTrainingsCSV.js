import Debug from 'debug'
import {
  Parser as Json2csvParser,
} from 'json2csv'

import client from 'modules/trainings/client'

const debug = Debug('podcasteo:bo:downloadTrainingsCSV')
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
  {
    label: 'Audience',
    value: 'audience',
    stringify: true,
  },
]

export default async function downloadTrainingsCSV() {
  const {
    data: array,
  } = await client.find({}, 10000, 0)
  const json2csvParser = new Json2csvParser({
    fields,
    delimiter: '\t',
    quote: '',
  })

  debug('publishTrainingsToCSV - generator', array)

  const tsv = json2csvParser.parse(array)

  debug('publishTrainingsToCSV - parse - done')

  return tsv
}
