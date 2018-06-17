import mongoose, {
  Schema,
} from 'mongoose'

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: false,
    default: 'Cloud',
  },
  lastname: {
    type: String,
    required: false,
    default: 'Strife',
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: [
      'USER',
      'ADMIN',
      'SUPERADMIN',
    ],
    default: 'USER',
  },
})

export default mongoose.model('User', schema)
