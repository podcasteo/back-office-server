module.exports = {
  server: {
    port: '4000',
  },
  mongo: {
    url: 'mongodb://localhost:32768/podcasteo',
  },
  jwt: {
    secretKey: 'secretkey',
    expiresIn: '60d',
  },
}
