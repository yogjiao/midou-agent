module.exports = {
  path: 'search',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./AgentSearch.js'))
    })
  }
}
