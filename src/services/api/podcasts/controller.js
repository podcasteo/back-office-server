export default {
  getAll: (req, res) => (res.send({
    podcasts: 'getAll',
  })),
  getOne: (req, res) => (res.send({
    podcasts: 'getOne',
  })),
  create: (req, res) => (res.send({
    podcasts: 'create',
  })),
  update: (req, res) => (res.send({
    podcasts: 'update',
  })),
  delete: (req, res) => (res.send({
    podcasts: 'delete',
  })),
}
