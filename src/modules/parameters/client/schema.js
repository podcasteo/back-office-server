import mongoose, {
  Schema,
} from 'mongoose'

const schema = new Schema({
  coeff_audience_itunes: {
    type: Number,
    required: true,
  },
  coeff_audience_affiliation: {
    type: Number,
    required: true,
  },
  coeff_audience_reseaux: {
    type: Number,
    required: true,
  },
  coeff_ranking_itunes: {
    type: Number,
    required: true,
  },
  coeff_ranking_audience: {
    type: Number,
    required: true,
  },
  coeff_ranking_twitter: {
    type: Number,
    required: true,
  },
  coeff_ranking_facebook: {
    type: Number,
    required: true,
  },
  coeff_ranking_twitter_anim: {
    type: Number,
    required: true,
  },
  coeff_trainee_audience: {
    type: Number,
    required: true,
  },
  coeff_trainee_episodes: {
    type: Number,
    required: true,
  },
  coeff_trainee_age: {
    type: Number,
    required: true,
  },
  coeff_trainee_const: {
    type: Number,
    required: true,
  },
  audiences_step: {
    type: [
      Number,
    ],
    required: true,
  },
  frequency_step: {
    type: [
      Number,
    ],
    required: true,
  },
  itunes_step: {
    type: [
      Number,
    ],
    required: true,
  },
  network_step: {
    type: [
      Number,
    ],
    required: true,
  },
})

export default mongoose.model('Parameters', schema)
