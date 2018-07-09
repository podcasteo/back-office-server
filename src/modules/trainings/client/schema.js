import mongoose, {
  Schema,
} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  nb_avis: {
    type: Number,
  },
  affiliation: {
    type: Number,
  },
  likes_fb: {
    type: Number,
  },
  follow_twitter: {
    type: Number,
  },
  follow_animateur: {
    type: Number,
  },
  age: {
    type: Number,
  },
  frequency: {
    type: Number,
  },
  audience: {
    type: Number,
  },
})

export default mongoose.model('Training', schema)
