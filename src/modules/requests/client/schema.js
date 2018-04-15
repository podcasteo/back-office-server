import mongoose, {
  Schema,
} from 'mongoose'

const schema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    defaultsTo: new Date(),
  },
})

export default mongoose.model('Request', schema)
