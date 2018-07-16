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
  cloudinary: {
    config: {
      cloud_name: 'podcasteo',
      api_key: 'apikey',
      api_secret: 'apisecret',
    },
  },
  api: {
    url: 'http://localhost:3000/api',
    user: {
      email: 'email',
      password: 'password',
    },
  },
  csv: {
    categories: {
      JV: 'games',
      Technologie: 'technology',
      'Cinéma/Série': 'cinema',
      Culture: 'culture',
      Société: 'society',
      Sports: 'sports',
      Gastronomie: 'food',
      'Dév personnel': 'lifestyle',
      Comédie: 'comedy',
      Interview: 'interview',
      Inclassables: 'unclassifiable',
    },
  },
}
