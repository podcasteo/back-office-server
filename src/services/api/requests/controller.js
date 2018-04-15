export default {
  getAll: (req, res) => (res.send({
    requests: 'getAll',
  })),
  getOne: (req, res) => (res.send({
    requests: 'getOne',
  })),
  create: (req, res) => (res.send({
    requests: 'create',
  })),
  update: (req, res) => (res.send({
    requests: 'update',
  })),
  delete: (req, res) => (res.send({
    requests: 'delete',
  })),
  handleRequest: (req, res) => (res.send({
    requests: 'handleRequest',
  })),
}
