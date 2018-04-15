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
    defaultsTo: 'Cloud',
  },
  lastname: {
    type: String,
    required: false,
    defaultsTo: 'Strife',
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
    defaultsTo: 'USER',
  },
})

// Export the Mongoose model
export default mongoose.model('User', schema)
