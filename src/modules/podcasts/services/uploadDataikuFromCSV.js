import neatCSV from 'neat-csv'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'
import Debug from 'debug'

import handleFirstDate from 'helpers/handleFirstDate'
import client from 'modules/podcasts/client'
import clientParameters from 'modules/parameters/client'

const debug = Debug('podcasteo:bo:uploadRankingsFromCSV')

function getStep(value, steps) {
  const orderSteps = orderBy(steps, 'desc')
  let letter = 'A'

  orderSteps.forEach((step) => {
    if (value < step) {
      letter = String.fromCharCode(letter.charCodeAt(0) + 1)
    }
  })

  return letter
}

function getAge(firstDate, podcast) {
  const firstRelease = new Date(podcast.firstRelease)
  const lastDate = new Date(firstDate)

  return ((lastDate.getTime() - firstRelease.getTime()) / 31556952000)
}

function getProvider(type, firstDate, podcast) {
  const index = findIndex(podcast[type].data, (provider) => provider.date.toISOString() === firstDate)

  return index < 0 ? {
    ratingCount: 0,
    trackCount: 0,
    frequency: 0,
    followers: 0,
  } : podcast[type].data[index]
}

async function updatePodcastRanking(ranking) {
  try {
    const podcast = await client.findByName(ranking.name)
    const value = {
      date: ranking.date,
      score: Math.round(ranking.score),
      ranking: ranking.ranking,
      audienceScore: Math.round(ranking.audienceScore),
      frequencyScore: Math.round(ranking.frequencyScore),
      networkScore: Math.round(ranking.networkScore),
      itunesScore: Math.round(ranking.itunesScore),
      traineeScore: Math.round(ranking.traineeScore),
      audienceGrade: ranking.audienceGrade,
      frequencyGrade: ranking.frequencyGrade,
      networkGrade: ranking.networkGrade,
      itunesGrade: ranking.itunesGrade,
      traineeGrade: ranking.traineeGrade,
    }
    const index = findIndex(podcast.ranking, (item) => item.date.toISOString() === ranking.date)

    if (index < 0) {
      podcast.ranking.push(value)
    } else {
      podcast.ranking.splice(index, 1, value)
    }

    podcast.ranking = orderBy(podcast.ranking, ['date'], ['desc']) // eslint-disable-line
    await client.updatePodcast(podcast)

    debug('updatePodcastRanking - done', podcast)

    return {
      create: true,
    }
  } catch (error) {
    debug('updatePodcastRanking - fail', error)

    return {
      create: false,
    }
  }
}

async function getPodcastRanking(firstDate, entry, parameters) {
  try {
    const name = (entry.xgb_Podcast || entry.gbt_Podcast || entry.ridge_Podcast)
    const podcast = await client.findByName(name)
    const itunes = getProvider('itunes', firstDate, podcast)
    const twitter = getProvider('twitter', firstDate, podcast)
    const animateur = getProvider('animateur', firstDate, podcast)
    const facebook = getProvider('facebook', firstDate, podcast)
    const audience = Math.round((entry.audience_final || entry.audience_predicted || entry.newcolumn_expression))
    const score = (
      (audience * itunes.frequency * parameters.coeff_ranking_audience) +
      (itunes.ratingCount * parameters.coeff_ranking_itunes) +
      (facebook.followers * parameters.coeff_ranking_facebook) +
      (twitter.followers * parameters.coeff_ranking_twitter) +
      (animateur.followers * parameters.coeff_ranking_twitter_anim)
    )
    const networkScore = (
      facebook.followers +
      twitter.followers +
      (animateur.followers * parameters.coeff_ranking_twitter_anim)
    )
    const traineeScore = (
      (audience * parameters.coeff_trainee_audience) +
      (itunes.trackCount * parameters.coeff_trainee_episodes) +
      (getAge(firstDate, podcast) * parameters.coeff_trainee_age) +
      parameters.coeff_trainee_const
    )
    const ranking = {
      name,
      date: firstDate,
      score,
      audienceScore: audience,
      frequencyScore: itunes.frequency,
      networkScore,
      itunesScore: itunes.ratingCount,
      traineeScore,
      audienceGrade: getStep(audience, parameters.audiences_step),
      frequencyGrade: getStep(itunes.frequency, parameters.frequency_step),
      networkGrade: getStep(itunes.networkScore, parameters.network_step),
      itunesGrade: getStep(itunes.ratingCount, parameters.itunes_step),
      traineeGrade: getStep(traineeScore, parameters.audiences_step),
    }

    debug('getPodcastRanking - done', ranking)

    return ranking
  } catch (error) {
    debug('getPodcastRanking - fail', error)

    return {
      error: true,
    }
  }
}

async function updatePodcastsRanking(firstDate, entries) {
  try {
    const parameters = await clientParameters.find()
    const rankingsPromises = entries.map((entry) => getPodcastRanking(firstDate, entry, parameters))
    const rankings = await Promise.all(rankingsPromises)
    let orderRankings = orderBy(rankings, ['score'], ['desc']) // eslint-disable-line
    let rankStep = 0

    orderRankings = orderRankings.map((ranking, i) => {
      if (ranking.error) {
        rankStep += 1
      } else {
        ranking.ranking = i + 1 - rankStep // eslint-disable-line
      }

      return ranking
    })

    const updatePromises = orderRankings.map((ranking) => updatePodcastRanking(ranking))

    await Promise.all(updatePromises)

    debug('updatePodcastsRanking - done')

    return {
      batch: true,
    }
  } catch (error) {
    debug('updatePodcastsRanking - fail', error)

    return {
      batch: false,
    }
  }
}

export default async function uploadDataikuFromCSV(date, file) {
  const firstDate = handleFirstDate(date)
  const entries = await neatCSV(file.buffer, {
    separator: ';', // specify optional cell separator
  })

  try {
    await updatePodcastsRanking(firstDate, entries)

    debug('uploadRankingsFromCSV - done')

    return {
      result: true,
    }
  } catch (error) {
    debug('uploadRankingsFromCSV - fail', error)

    return {
      result: false,
    }
  }
}
