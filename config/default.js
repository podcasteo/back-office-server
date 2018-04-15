module.exports = {
  server: {
    port: '3001',
  },
  mongo: {
    url: 'mongodb://localhost:32768/podcasteo',
  },
  jwt: {
    secretKey: 'secretkey',
    expiresIn: '60d',
  },
}
