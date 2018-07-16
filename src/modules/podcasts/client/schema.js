import mongoose, {
  Schema,
} from 'mongoose'

import getAvatar from 'helpers/getAvatar'

const providerDataSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  trackCount: {
    type: Number,
  },
  lastRelease: {
    type: Date,
  },
  ratingCount: {
    type: Number,
  },
  frequency: {
    type: Number,
  },
  followers: {
    type: Number,
  },
})
const providerSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  data: [
    providerDataSchema,
  ],
})
const rankingSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
  },
  ranking: {
    type: Number,
  },
  audienceScore: {
    type: Number,
  },
  frequencyScore: {
    type: Number,
  },
  networkScore: {
    type: Number,
  },
  itunesScore: {
    type: Number,
  },
  traineeScore: {
    type: Number,
  },
  audienceGrade: {
    type: String,
  },
  frequencyGrade: {
    type: String,
  },
  networkGrade: {
    type: String,
  },
  itunesGrade: {
    type: String,
  },
  traineeGrade: {
    type: String,
  },
})
const schema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  producer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  firstRelease: {
    type: Date,
  },
  categorie: {
    type: String,
    enum: [
      'games',
      'technology',
      'cinema',
      'culture',
      'society',
      'sports',
      'food',
      'lifestyle',
      'comedy',
      'interview',
      'unclassifiable',
      '',
    ],
  },
  region: {
    type: String,
    enum: [
      'Alsace-Champagne-Ardennes-Lorraine',
      'Auvergne-Rhône-Alpes',
      'Bourgogne-Franche-Comté',
      'Bretagne',
      'Centre-Val de Loire',
      'Corse',
      'Grand Est',
      'Hauts-de-France',
      'Île-de-France',
      'Normandie',
      'Nouvelle-Aquitaine',
      'Occitanie',
      'Pays de la Loire',
      'Provence-Alpes-Côte d\'Azur',
      'Guadeloupe',
      'Guyane (française)',
      'Martinique',
      'Languedoc',
      'La Réunion',
      'Mayotte',
      'Europe',
      'Amériques',
      'Afrique',
      'Asie',
      'Océanie',
      '',
    ],
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
  isProd: {
    type: Boolean,
    default: false,
  },
  isInactif: {
    type: Boolean,
    default: false,
  },
  isPodcasteo: {
    type: Boolean,
    default: false,
  },
  haveWomen: {
    type: Boolean,
    default: false,
  },
  haveLeadWomen: {
    type: Boolean,
    default: false,
  },
  itunes: {
    type: providerSchema,
    required: false,
  },
  youtube: {
    type: providerSchema,
    required: false,
  },
  facebook: {
    type: providerSchema,
    required: false,
  },
  twitter: {
    type: providerSchema,
    required: false,
  },
  animateur: {
    type: providerSchema,
    required: false,
  },
  ranking: {
    type: [
      rankingSchema,
    ],
    required: false,
  },
})

schema.virtual('avatar').get(function () { // eslint-disable-line
  return getAvatar('podcasts', this.slug)
})

schema.set('toObject', {
  virtuals: true,
})
schema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('Podcast', schema)
