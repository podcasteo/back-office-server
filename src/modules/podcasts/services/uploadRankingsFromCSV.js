import neatCSV from 'neat-csv'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'
import Debug from 'debug'

import handleFirstDate from 'helpers/handleFirstDate'
import client from 'modules/podcasts/client'

const debug = Debug('podcasteo:bo:uploadRankingsFromCSV')

async function updatePodcastRanking(firstDate, podcastInput) {
  try {
    const podcast = await client.findByName(podcastInput.podcast)
    const ranking = {
      date: firstDate,
      score: podcastInput.score,
      ranking: podcastInput.ranking,
      audienceScore: podcastInput.audienceScore,
      frequencyScore: podcastInput.frequencyScore,
      networkScore: podcastInput.networkScore,
      itunesScore: podcastInput.itunesScore,
      traineeScore: podcastInput.trainee,
      audienceGrade: podcastInput.audienceLetter,
      frequencyGrade: podcastInput.frequencyLetter,
      networkGrade: podcastInput.networkLetter,
      itunesGrade: podcastInput.itunesLetter,
      traineeGrade: podcastInput.traineeLetter,
    }
    const index = findIndex(podcast.ranking, (item) => item.date.toISOString() === firstDate)

    if (index < 0) {
      podcast.ranking.push(ranking)
    } else {
      podcast.ranking.splice(index, 1, ranking)
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

async function updatePodcastsRanking(firstDate, podcasts) {
  try {
    const promises = podcasts.map((item) => updatePodcastRanking(firstDate, item))

    await Promise.all(promises)

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

export default async function uploadRankingsFromCSV(date, file) {
  const firstDate = handleFirstDate(date)
  const podcasts = await neatCSV(file.buffer)

  try {
    await updatePodcastsRanking(firstDate, podcasts)

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
