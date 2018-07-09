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
  aws: {
    config: {
      accessKeyId: 'nothingtosee',
      secretAccessKey: 'nothingtosee',
      region: 'eu-west-3',
    },
    s3: {
      region: 'eu-west-3',
      params: {
        Bucket: 'podcasteo',
      },
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
