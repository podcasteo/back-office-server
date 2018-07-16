import cloudinary from 'cloudinary'
import config from 'config'

cloudinary.config(config.get('cloudinary.config'))

export default cloudinary
