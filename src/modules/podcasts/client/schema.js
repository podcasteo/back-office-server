import mongoose, {
  Schema,
} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  producers: {
    type: [
      String,
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  firstRelease: {
    type: Date,
    required: false,
  },
  categorie: {
    type: String,
    required: true,
    enum: [
      'games',
      'technology',
      'cinema',
      'culture',
      'society',
      'sports',
      'food',
      'personal',
      'comedy',
      'interview',
      'unclassifiable',
    ],
  },
  region: {
    type: String,
    required: true,
    enum: [
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
      'La Réunion',
      'Mayotte',
      'Europe',
      'Amériques',
      'Afrique',
      'Asie',
      'Océanie',
    ],
  },
  woman: {
    type: String,
    required: true,
    enum: [
      'animation',
      'columnist',
      'none',
    ],
  },
  itunes: {
    type: new Schema({
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      data: [
        {
          date: {
            type: Date,
            required: true,
          },
          trackCount: {
            type: Number,
            required: true,
          },
          lastRelease: {
            type: Date,
            required: true,
          },
          ratingCount: {
            type: Number,
            required: true,
          },
          frequency: {
            type: Number,
            required: true,
          },
        },
      ],
    }),
    required: false,
  },
  soundcloud: {
    type: new Schema({
      url: {
        type: String,
        required: true,
      },
      data: [
        {
          date: {
            type: Date,
            required: true,
          },
          trackCount: {
            type: Number,
            required: true,
          },
          followers: {
            type: Number,
            required: true,
          },
        },
      ],
    }),
    required: false,
  },
  youtube: {
    type: new Schema({
      url: {
        type: String,
        required: true,
      },
      data: [
        {
          date: {
            type: Date,
            required: true,
          },
          followers: {
            type: Number,
            required: true,
          },
        },
      ],
    }),
    required: false,
  },
  isPodcasteo: {
    type: Boolean,
  },
  isTraining: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
  },
})

export default mongoose.model('Podcast', schema)
