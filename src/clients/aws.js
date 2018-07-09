import AWS from 'aws-sdk'
import config from 'config'

AWS.config = config.get('aws.config')

export default new AWS.S3(config.get('aws.s3'))
