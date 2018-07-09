import neatCSV from 'neat-csv'
import Debug from 'debug'

import client from 'modules/trainings/client'

const debug = Debug('podcasteo:bo:publishPodcastToProduction')

async function createTraining(trainingInput) {
  try {
    const training = {
      name: trainingInput.Podcast,
      producer: trainingInput.Producteur,
      nb_avis: trainingInput['Nb Avis'],
      affiliation: trainingInput.Affiliation,
      likes_fb: trainingInput['Likes FB'],
      follow_twitter: trainingInput['Follow Twitter'],
      follow_animateur: trainingInput['Follow Twitter Animateur'],
      age: trainingInput.Age,
      frequency: trainingInput['Fréquence (ep/mois)'],
      audience: trainingInput.Audience,
    }

    await client.createTraining(training)

    debug('createTraining - done', training)

    return {
      create: true,
    }
  } catch (error) {
    debug('createTraining - fail', error)

    return {
      create: false,
    }
  }
}

async function createTrainingsArray(trainings) {
  try {
    const promises = trainings.map((item) => createTraining(item))

    await Promise.all(promises)

    debug('createTrainingsArray - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('createTrainingsArray - fail', error)

    return {
      batch: false,
    }
  }
}

export default async function createTrainingsFromCSV(file) {
  const trainings = await neatCSV(file.buffer, {
    separator: '\t', // specify optional cell separator
  })

  try {
    await createTrainingsArray(trainings)

    debug('createTrainingsFromCSV - done')

    return {
      result: true,
    }
  } catch (error) {
    debug('createTrainingsFromCSV - fail', error)

    return {
      result: false,
    }
  }
}
